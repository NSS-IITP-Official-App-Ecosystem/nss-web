import { createClient } from "@/utils/supabase/server";
import RequestBloodClient from "./RequestBloodClient";

export default async function RequestBloodPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const isIITPStudent = user?.email?.endsWith('@iitp.ac.in') || false;
  let activeRequests = [];
  let gensecProfiles = [];

  if (isIITPStudent) {
    const { data, error } = await supabase
      .from("blood_requests")
      .select("*")
      .eq("status", 'open');

    if (!error && data) {
      activeRequests = data;
    }
  }

  const { data: teamMembers, error: teamError } = await supabase
    .from("team_members")
    .select("name, email, image_url, role")
    .ilike("role", "%General Secretary%");

  if (!teamError && teamMembers) {
    gensecProfiles = teamMembers;
  }

  return (
    <RequestBloodClient
      initialActiveRequests={activeRequests}
      isIITPStudent={isIITPStudent}
      gensecProfiles={gensecProfiles}
    />
  );
}