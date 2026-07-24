import { createClient } from '@/utils/supabase/server';
import CollaborateHero from './CollaborateHero';
import CollaborateClient from './CollaborateClient';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Collaborate | NSS IIT Patna",
    description: "Partner with NSS IIT Patna cell to sponsor community development projects, co-host awareness camps, or support educational wings.",
};

export default async function CollaboratePage() {
    let collaborators = [];
    let gensecProfiles = [];

    // Fetch partners from database
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('collaborators')
            .select('id, name, logo_url, url')
            .order('name');

        if (!error && data) {
            collaborators = data;
        }

        const { data: teamMembers, error: teamError } = await supabase
            .from('team_members')
            .select('name, email, image_url, role')
            .eq('academic_year', '2026-27')
            .ilike('role', '%General Secretary%')
            .order("sort_order", {ascending: false})

        if (!teamError && teamMembers) {
            gensecProfiles = teamMembers;
        }
    } catch (err) {
        console.error("Failed to fetch database data:", err);
    }

    // Resilient fallback seed data
    if (collaborators.length === 0) {
        collaborators = [
            { id: 'c1', name: 'CLP', logo_url: '/collaborators/CLP.png' },
            { id: 'c2', name: 'LCCWA', logo_url: '/collaborators/lccwa.png' },
            { id: 'c3', name: 'Udaan', logo_url: '/collaborators/udaan.png' },
            { id: 'c4', name: 'Vidya', logo_url: '/collaborators/vidya.png' }
        ];
    }

    return (
        <div className="bg-[#FAF9F6] min-h-screen">
            {/* Animated Interactive Hero */}
            <CollaborateHero />

            {/* Split Pillars Grid, Forms, and Trust Network */}
            <CollaborateClient 
                collaborators={collaborators} 
                gensecProfiles={gensecProfiles} 
            />
        </div>
    );
}
