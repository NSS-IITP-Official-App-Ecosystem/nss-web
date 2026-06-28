import { createClient } from '@/utils/supabase/server';
import CollaborateHero from './CollaborateHero';
import CollaborateClient from './CollaborateClient';

export const metadata = {
    title: "Collaborate | NSS IIT Patna",
    description: "Partner with NSS IIT Patna cell to sponsor community development projects, co-host awareness camps, or support educational wings.",
};

export default async function CollaboratePage() {
    let collaborators = [];

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
    } catch (err) {
        console.error("Failed to fetch collaborators, falling back to static list:", err);
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
            <CollaborateClient collaborators={collaborators} />
        </div>
    );
}
