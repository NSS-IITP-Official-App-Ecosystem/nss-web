-- ========================================================
-- Seed Data for NSS Team Roster (2025-26)
-- Execute this script in Supabase SQL Editor to populate roster
-- ========================================================

-- DO NOT TRUNCATE/CLEAR the table to preserve 2026-27 entries

-- Clear any existing 2025-26 team members to allow clean updates
DELETE FROM public.team_members WHERE academic_year = '2025-26';

-- ==========================================
-- 1. Administrative Leadership (2025-26)
-- ==========================================

INSERT INTO public.team_members (academic_year, name, role, category, image_url, email, bio, linkedin_url, github_url, sort_order) VALUES
('2025-26', 'Prof. T. N. Singh', 'Director, IIT Patna', 'admin', '/assets/administration/TN Singh.jpg', 'director@iitp.ac.in', 'Patron & Director of IIT Patna. Provides administrative guidance, strategic vision, and structural oversight for all social service activities under the NSS banner.', 'https://linkedin.com', 'https://github.com', 1),
('2025-26', 'Dr. Sushant Kumar', 'Academic Dean UG', 'admin', '/assets/administration/Sushanth kumar.jpg', 'adean_ug@iitp.ac.in', 'Academic Dean UG at IIT Patna. Oversees undergraduate academic affairs, curriculum development, and academic support for student social activities.', 'https://linkedin.com', 'https://github.com', 2),
('2025-26', 'Dr. Somanath Pradhan', 'Professor in Charge, NSS', 'admin', '/assets/administration/somnathpradhan.jpg', 'pic_nss@iitp.ac.in', 'NSS Professor in Charge. Steers academic integrations, faculty advisory boards, central community service campaigns, and local village developmental camps.', 'https://linkedin.com', 'https://github.com', 3),
('2025-26', 'Mr. Deepak Chaurasia', 'Security Officer & NSS Advisor', 'admin', '/assets/administration/deepakchaurasia.jpeg', 'security@iitp.ac.in', 'Security Officer & NSS Advisor. Supervises student outreach safety protocols, transit logistics, campus emergency services, and operational compliance.', 'https://linkedin.com', 'https://github.com', 4);

-- ==========================================
-- 2. General Secretaries (2025-26)
-- ==========================================

INSERT INTO public.team_members (academic_year, name, role, category, image_url, email, bio, linkedin_url, github_url, sort_order) VALUES
('2025-26', 'Dinker Anand', 'General Secretary', 'secretary', '/assets/team_2025-26/dinkar_anand.jpeg', 'dinker.anand@iitp.ac.in', 'General Secretary of NSS IIT Patna for 2025-26. Coordinates campus outreach cells and drives ecological and developmental operations.', 'https://linkedin.com', 'https://github.com', 8),
('2025-26', 'Mahipal', 'General Secretary', 'secretary', '/assets/team_2025-26/Mahipal_2301MC15.jpeg', 'mahipal@iitp.ac.in', 'General Secretary of NSS IIT Patna for 2025-26. Oversees student volunteer operations, guides wing secretaries, and manages structural outreach programs.', 'https://linkedin.com', 'https://github.com', 9);

-- ==========================================
-- 3. Student Core & Mentors (2025-26 from PDF)
-- ==========================================

INSERT INTO public.team_members (academic_year, name, role, category, image_url, email, bio, linkedin_url, github_url, sort_order) VALUES
-- Secretaries (Category: core)
('2025-26', 'Ankesh Kumar', 'Secretary - Teaching And Technical Wing', 'core', '/assets/team_2025-26/IMG_20260707_124052 - Ankesh Kumar.jpg', 'ankesh_2301cs06@iitp.ac.in', 'NSS Wing Secretary of Teaching and Technical Wing.', 'https://www.linkedin.com/in/ankesh-kumar-758570284', 'https://github.com', 20),
('2025-26', 'Eshan Bhaskar', 'Secretary - Teaching And Technical Wing', 'core', '/assets/team_2025-26/Eshan (1) - Eshan Bhaskar.jpg', 'eshan_2301cs16@iitp.ac.in', 'NSS Wing Secretary of Teaching and Technical Wing.', 'https://www.linkedin.com/in/eshan-bhaskar', 'https://github.com', 21),
('2025-26', 'Aditi Kashyap', 'Secretary - Prayatna Wing', 'core', '/assets/team_2025-26/IMG_2287 - Aditi Kashyap.JPG', 'aditi_2301ec03@iitp.ac.in', 'NSS Wing Secretary of Prayatna Wing.', 'https://www.linkedin.com/in/aditi-kashyap-b755a328b', 'https://github.com', 22),
('2025-26', 'Gali Uday Aditya', 'Secretary - Rural Development Wing', 'core', '/assets/team_2025-26/IMG_20260707_190512 - Uday Aditya.jpg', 'uday_2301cs71@iitp.ac.in', 'NSS Wing Secretary of Rural Development Wing.', 'https://www.linkedin.com/in/gali-uday-aditya-139699290/', 'https://github.com', 23),

-- Sub Coordinators / Mentors (Category: mentor)
('2025-26', 'Parnava Maitra', 'Sub Coordinator - DNC And Social Media Wing', 'mentor', '/assets/team_2025-26/IMG-20260626-WA0008 - Parnava Maitra.jpg', 'parnava_2401mm32@iitp.ac.in', 'NSS Sub Coordinator of DNC and Social Media Wing.', 'https://www.linkedin.com/in/parnava-maitra-84778b357', 'https://github.com', 30),
('2025-26', 'Piyush kumar', 'Sub Coordinator - Prayatna Wing', 'mentor', '/assets/team_2025-26/20260419_165502 - PIYUSH KUMAR.jpg', 'Piyush_2402mt08@iitp.ac.in', 'NSS Sub Coordinator of Prayatna Wing.', 'https://in.linkedin.com/in/piyush-kumar-622712340', 'https://github.com', 31),
('2025-26', 'Neha Sree Kuppam', 'Sub Coordinator - Prayatna Wing', 'mentor', '/assets/team_2025-26/NEHA - Neha Sree.jpg', 'neha_2402pc02@iitp.ac.in', 'NSS Sub Coordinator of Prayatna Wing.', 'https://linkedin.com/in/neha-sree-kuppam', 'https://github.com', 32),
('2025-26', 'RAHUL DURGACHAND', 'Sub Coordinator - Rural Development Wing', 'mentor', '/assets/team_2025-26/IMG_20260527_143919 - Rahul Durgachand.jpg', 'durgachand_2402cm09@iitp.ac.in', 'NSS Sub Coordinator of Rural Development Wing.', 'https://www.linkedin.com/in/rahul-durgachand-307a23355', 'https://github.com', 33),
('2025-26', 'Anish Kumar', 'Sub Coordinator - Teaching And Technical Wing', 'mentor', '/assets/team_2026_27/IMG-20260613-WA0024(1) - Anish Kumar.jpg', 'anish_2401mc26@iitp.ac.in', 'NSS Sub Coordinator of Teaching and Technical Wing.', 'https://linkedin.com/in/anish711', 'https://github.com', 34),
('2025-26', 'D Sravan Kumar', 'Sub Coordinator - Prayatna Wing', 'mentor', '/assets/team_2025-26/photo - D.Sravan Kumar.jpeg', 'darla_2401cs45@iitp.ac.in', 'NSS Sub Coordinator of Prayatna Wing.', 'https://www.linkedin.com/in/d-sravan-kumar/', 'https://github.com', 35),
('2025-26', 'Tanishk Raj', 'Sub Coordinator - Teaching And Technical Wing', 'mentor', '/assets/team_2025-26/IMG_20250815_103331_883 - TANISHK RAJ.jpg', 'tanishk_2401ec11@iitp.ac.in', 'NSS Sub Coordinator of Teaching and Technical Wing.', 'https://www.linkedin.com/in/tanishk-raj-184b832b7', 'https://github.com', 36),
('2025-26', 'Kshitij Singh', 'Sub Coordinator - Rural Development Wing', 'mentor', '/assets/team_2025-26/IMG_20260619_172948 - Kshitij Singh.png', 'kshitij_2401ct30@iitp.ac.in', 'NSS Sub Coordinator of Rural Development Wing.', 'https://www.linkedin.com/in/kshitij-singh-34524230a', 'https://github.com', 37),
('2025-26', 'Himanshi', 'Sub Coordinator - Chetna Wing', 'mentor', '/assets/team_2025-26/Screenshot_2026-07-07-12-22-04-37_99c04817c0de5652397fc8b56c3b3817 - Himanshi.jpg', 'himanshi_2401ce23@iitp.ac.in', 'NSS Sub Coordinator of Chetna Wing.', 'https://linkedin.com', 'https://github.com', 38),
('2025-26', 'Varada Anirudh', 'Sub Coordinator - Environmental Wing', 'mentor', '/assets/team_2025-26/WhatsApp Image 2025-03-30 at 16.44.46 - Anirudh Varada.jpeg', 'varada_2402pc01@iitp.ac.in', 'NSS Sub Coordinator of Environmental Wing.', 'https://www.linkedin.com/in/varada-anirudh-864332377', 'https://github.com', 39),
('2025-26', 'Sai Gayathri', 'Sub Coordinator - Prayatna Wing', 'mentor', '/assets/team_2025-26/IMG-20260419-WA0099 - Sai Gayathri.jpg', 'nimmagadda_2401ec17@iitp.ac.in', 'NSS Sub Coordinator of Prayatna Wing.', 'https://linkedin.com', 'https://github.com', 40),
('2025-26', 'Anshika Garg', 'Sub Coordinator - Teaching And Technical Wing', 'mentor', '/assets/team_2025-26/IMG-20260327-WA0059 - Anshika Garg.jpg', 'anshika_2402st06@iitp.ac.in', 'NSS Sub Coordinator of Teaching and Technical Wing.', 'https://www.linkedin.com/in/anshika-garg-447071325', 'https://github.com', 41);
