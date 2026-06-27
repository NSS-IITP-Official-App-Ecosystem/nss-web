'use server'

import { createClient } from "@/utils/supabase/client";

export async function HandleShareIdeaSubmit(formData) {

    if(!formData.token) return  {'error' : true};

    const trunsitleVerification = await VerifyTrunstile(formData.token);

    if(!trunsitleVerification) return {'error' : true};

    const supabase = createClient();

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

    if(!formData.token) return  {'error' : true};

    const trunsitleVerification = await VerifyTrunstile(formData.token);

    if(!trunsitleVerification) return {'error' : true};

    const supabase = createClient();

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

async function VerifyTrunstile(token) {
    const response = await fetch("https://cloudflare.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: token,
        }),
    });

    const outcome = await response.json();

    return outcome.success;
}