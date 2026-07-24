'use server'

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// --- VALIDATION SCHEMAS ---

const SignUpSchema = z.object({
    fullname: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be under 100 characters").trim(),
    email: z.string().email("Invalid email format").endsWith("@iitp.ac.in", "Only IIT Patna student emails (@iitp.ac.in) are allowed"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    token: z.string().min(1, "Human verification is required")
});

const SignInSchema = z.object({
    email: z.string().email("Invalid email format").endsWith("@iitp.ac.in", "Only IIT Patna student emails (@iitp.ac.in) are allowed"),
    password: z.string().min(1, "Password cannot be empty"),
    token: z.string().min(1, "Human verification is required")
});

const BloodRequestSchema = z.object({
    patientName: z.string().min(2, "Patient name must be at least 2 characters").max(100, "Patient name must be under 100 characters"),
    bloodGroupForm: z.enum(['A+', 'A-', 'AB+', 'AB-', 'O+', 'O-'], {
        errorMap: () => ({ message: "Invalid blood group selected" })
    }),
    units: z.preprocess((val) => Number(val), z.number().int().min(1, "At least 1 unit is required").max(20, "Units cannot exceed 20")),
    hospital: z.string().min(3, "Hospital name and location must be at least 3 characters").max(200),
    contact: z.string().min(10, "Contact number must be at least 10 digits").max(15, "Contact number must be under 15 characters").regex(/^\+?[0-9\s\-]+$/, "Invalid contact number format"),
    reason: z.string().min(10, "Please provide a valid medical reason (min 10 characters)").max(500),
    neededBy: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid needed by date"),
    requestToken: z.string().min(1, "Human verification is required")
});

const CollaborationSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be under 100 characters"),
    email: z.string().email("Invalid email format"),
    organization: z.string().min(2, "Organization name must be at least 2 characters").max(200, "Organization name must be under 200 characters"),
    subject: z.string().min(10, "Please provide a clear subject (Reason in one phrase)").max(100),
    message: z.string().min(20, "Please write a message in details.").max(2000),
    requestToken: z.string().min(1, "Human verification is required")
});

// --- HELPER FUNCTIONS ---

async function VerifyTrunstile(token) {
    try {
        const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                secret: process.env.TURNSTILE_SECRET_KEY,
                response: token,
            }),
        });

        const outcome = await response.json();
        return outcome.success;
    } catch (err) {
        console.error("Turnstile verification error:", err);
        return false;
    }
}

// --- SERVER ACTIONS ---

export async function HandleShareIdeaSubmit(formData) {

    if (!formData.token) return { 'error': true };

    const trunsitleVerification = await VerifyTrunstile(formData.token);

    if (!trunsitleVerification) return { 'error': true };

    const supabase = await createClient();

    const { error } = await supabase.from('suggestions').insert({
        'sender_name': formData.name,
        'category': formData.areaOfSuggestion,
        'sender_email': formData.email,
        'message': formData.msg
    });

    return {
        'error': error ? true : false
    }

}

export async function HandleThanksSubmit(formData) {

    if (!formData.token) return { 'error': true };

    const trunsitleVerification = await VerifyTrunstile(formData.token);

    if (!trunsitleVerification) return { 'error': true };

    const supabase = await createClient();

    const { error } = await supabase.from('thanks').insert({
        'sender_name': formData.senderName.trim(),
        'recipient_name': formData.receipentName.trim(),
        'sender_relationship': formData.senderRelationship,
        'message': formData.msg.trim()
    });

    return {
        'error': error ? true : false
    }

}

export async function handleRequestBloodSubmit(data) {
    const validation = BloodRequestSchema.safeParse(data);
    if (!validation.success) {
        return { error: { message: validation.error.issues[0]?.message || "Invalid input data." } };
    }
    const validatedData = validation.data;

    const turnstileVerification = await VerifyTrunstile(validatedData.requestToken);
    if (!turnstileVerification) {
        return { error: { message: "Invalid Turnstile verification." } };
    }

    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        return { error: { message: "Unauthorized. Please log in first." } };
    }

    const { data: insertData, error: insertError } = await supabase.from("blood_requests").insert({
        patient_name: validatedData.patientName,
        blood_group: validatedData.bloodGroupForm,
        units_required: validatedData.units,
        hospital: validatedData.hospital,
        contact_number: validatedData.contact,
        needed_by: new Date(validatedData.neededBy).toISOString(),
        reason: validatedData.reason,
        created_by: user.id,
        status: 'open'
    }).select().single();

    if (insertError) {
        return { error: { message: insertError.message } };
    }

    try {
        const { data: gensecMembers, error: gensecError } = await supabase
            .from('team_members')
            .select('email')
            .eq("session", "2026-27")
            .ilike('role', '%General Secretary%');

        if (!gensecError && gensecMembers && gensecMembers.length > 0) {
            const recipientEmails = gensecMembers.map(m => m.email).filter(Boolean);

            if (recipientEmails.length > 0) {
                await resend.emails.send({
                    from: 'NSS Blood Buddy <onboarding@resend.dev>',
                    to: recipientEmails,
                    subject: `Emergency Blood Request: ${validatedData.bloodGroupForm} Required`,
                    html: `
                        <h3>New Emergency Blood Request Raised</h3>
                        <p>An emergency blood request has been raised on the NSS web portal.</p>
                        <hr />
                        <p><strong>Patient Name:</strong> ${validatedData.patientName}</p>
                        <p><strong>Blood Group Required:</strong> <span style="color: #ec003f; font-weight: bold;">${validatedData.bloodGroupForm}</span></p>
                        <p><strong>Units Required:</strong> ${validatedData.units}</p>
                        <p><strong>Hospital Name & Location:</strong> ${validatedData.hospital}</p>
                        <p><strong>Contact Number:</strong> ${validatedData.contact}</p>
                        <p><strong>Needed By:</strong> ${new Date(validatedData.neededBy).toLocaleDateString()}</p>
                        <p><strong>Medical Emergency Reason:</strong> ${validatedData.reason}</p>
                        <hr />
                        <p style="font-size: 11px; color: #777;">This is an automated message sent by the NSS IIT Patna portal.</p>
                    `
                });
            }
        }
    } catch (emailErr) {
        console.error("Failed to send email notification to GenSec:", emailErr);
    }

    return { success: true, data: insertData };
}

export async function handleSignUp(data) {
    const validation = SignUpSchema.safeParse(data);
    if (!validation.success) {
        return { error: validation.error.issues[0]?.message || "Invalid input data." };
    }
    const { email, password, fullname, token } = validation.data;

    const turnstileVerification = await VerifyTrunstile(token);
    if (!turnstileVerification) {
        return { error: "Turnstile verification failed. Please try again." };
    }

    const supabase = await createClient();

    // Check if email already exists in profiles table
    const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .maybeSingle();

    if (checkError) {
        console.error('Error checking duplicate email:', checkError);
    }

    if (existingProfile) {
        return { error: 'This email is already registered. Please sign in instead.' };
    }

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullname,
            }
        }
    });

    if (signUpError) {
        return { error: signUpError.message };
    }

    // Check if email confirmation is required or if signed in automatically
    if (signUpData?.user && signUpData?.session === null) {
        return {
            success: 'Registration successful! Please check your email inbox to verify your account.',
            session: null
        };
    }

    return {
        success: 'Account created and signed in successfully!',
        session: signUpData.session
    };
}

export async function handleSignIn(data) {
    const validation = SignInSchema.safeParse(data);
    if (!validation.success) {
        return { error: validation.error.issues[0]?.message || "Invalid input data." };
    }
    const { email, password, token } = validation.data;

    const turnstileVerification = await VerifyTrunstile(token);
    if (!turnstileVerification) {
        return { error: "Turnstile verification failed. Please try again." };
    }

    const supabase = await createClient();

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (signInError) {
        return { error: signInError.message || 'Invalid email or password.' };
    }

    return {
        success: 'Successfully signed in!',
        session: signInData.session
    };
}

export async function handleCollaborationSubmit(data) {
    const validation = CollaborationSchema.safeParse(data);
    if(!validation.success) {
        return { error : validation.error.issues[0]?.message || "Invalid form input"};
    }

    const { requestToken } = validation.data;

    const turnstileVerification = await VerifyTrunstile(requestToken);
    if (!turnstileVerification) {
        return { error: "Turnstile verification failed. Please try again." };
    }

    const validatedData = validation.data;
    const supabase = await createClient();

    const { data: insertData, error: insertError } = await supabase.from("collaborate_requests").insert({
        name: validatedData.name,
        email : validatedData.email,
        organization : validatedData.organization,
        subject : validatedData.subject,
        message : validatedData.message,
        status : 'pending'
    });

    if (insertError) {
        return { error: insertError.message  };
    }

    return { success : true, data : insertData};
}