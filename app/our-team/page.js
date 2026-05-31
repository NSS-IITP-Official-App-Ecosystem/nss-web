"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaEnvelope,
  FaLinkedinIn,
  FaGithub,
  FaMagnifyingGlass,
  FaCircleInfo,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHeart,
  FaCircleCheck
} from 'react-icons/fa6';
import './our-team.css';

// Team Roster Data
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Ade Balakrishna",
    role: "General Secretary",
    detailedRole: "General Secretary",
    image: "/assets/team1/Ade_Balakrishna.jpg",
    email: "ade.balakrishna@iitp.ac.in",
    bio: "General Secretary of NSS IIT Patna. Leads overall student volunteer operations, guides cell secretaries, manages structural outreach budgets, and directs campus-wide social events.",
    category: "secretary",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 2,
    name: "Rabi Kumar Shaw",
    role: "Cell Secretary",
    detailedRole: "Secretary - Teaching & Tech Skills",
    image: "/assets/team1/Rabi_kumar.jpg",
    email: "rabi.kumar@iitp.ac.in",
    bio: "Directs tutoring schedules, rural high school computer classes, and spoken English workshops. Standardizes syllabus content and guides student mentors.",
    category: "core",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 3,
    name: "PR Veronica",
    role: "Cell Secretary",
    detailedRole: "Secretary - Environmental & Chetna",
    image: "/assets/team1/podili_Ruby_Veronica.jpg",
    email: "pr.veronica@iitp.ac.in",
    bio: "Coordinates clean-up campaigns, rural plantation drives, and local health-hygiene education programs. Directs voluntary action plans and manages ecological schedules.",
    category: "core",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 4,
    name: "Sudhanshu Shekhar",
    role: "Cell Secretary",
    detailedRole: "Secretary - Rural Development",
    image: "/assets/team1/sudhanshu_kumar.jpg",
    email: "sudhanshu.kumar@iitp.ac.in",
    bio: "Drives rural outreach, agricultural expansion programs, and self-help group setups. Directs collaboration with local panchayat committees.",
    category: "core",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 5,
    name: "Rishav Shivare",
    role: "Secretary",
    detailedRole: "Secretary - Nukkad Awareness",
    image: "/assets/team1/Rishabh_shivhare.jpg",
    email: "rishav.shivare@iitp.ac.in",
    bio: "Directs scriptwriting and schedules street plays (Nukkad Natak) about vital social issues. Manages event schedules and outreach locations.",
    category: "core",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 6,
    name: "Ayushman Singh",
    role: "Secretary",
    detailedRole: "Secretary - Logistics Team",
    image: "/assets/team1/ayushman_singh.jpg",
    email: "ayushman.singh@iitp.ac.in",
    bio: "Directs transportation logistics, inventory allocation, and support systems during large camps. Coordinates supply distributions across villages.",
    category: "core",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  // PG Representatives
  {
    id: 50,
    name: "Abhishek Kumar Gupta",
    role: "PG Representative",
    detailedRole: "Post-Graduate Student Representative",
    image: "/assets/team1/abhishek_kumar_gupta.jpeg",
    email: "abhishek.kumar@iitp.ac.in",
    bio: "Post-Graduate Student Representative for the NSS Core Team. Helps align PG research scholars and post-grad volunteers with social welfare initiatives.",
    category: "pg",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 51,
    name: "Aditya Mishra",
    role: "PG Representative",
    detailedRole: "Post-Graduate Student Representative",
    image: "/assets/team1/aditya_mishra.jpeg",
    email: "aditya.mishra@iitp.ac.in",
    bio: "Post-Graduate Student Representative for the NSS Core Team. Facilitates volunteer operations and post-grad student engagement.",
    category: "pg",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 52,
    name: "Muskan Srivastava",
    role: "PG Representative",
    detailedRole: "Post-Graduate Student Representative",
    image: "/assets/team1/muskan_srivastava.jpeg",
    email: "muskan.srivastava@iitp.ac.in",
    bio: "Post-Graduate Student Representative for the NSS Core Team. Directs outreach programs and academic coordination for PG volunteers.",
    category: "pg",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  // Mentors - Teaching and Technical
  {
    id: 60,
    name: "Aditya Onam",
    role: "Teaching & Tech Lead",
    detailedRole: "Team Lead - Teaching & Technical",
    image: "/assets/team1/Aditya_Onam.jpg",
    email: "aditya.onam@iitp.ac.in",
    bio: "NSS Teaching & Tech Lead. Designs computer literacy curriculums and manages tutoring sessions.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 61,
    name: "Eshan Bhaskar",
    role: "Teaching & Tech Mentor",
    detailedRole: "Mentor - Teaching & Technical",
    image: "/assets/team1/Eshan_Bhaskar.png",
    email: "eshan.bhaskar@iitp.ac.in",
    bio: "NSS Teaching & Tech Mentor. Teaches coding and basics of computer science to local school kids.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 62,
    name: "Lalit Sen",
    role: "Teaching & Tech Mentor",
    detailedRole: "Mentor - Teaching & Technical",
    image: "/assets/team1/LALIT_2301ME67.jpg",
    email: "lalit.sen@iitp.ac.in",
    bio: "NSS Teaching & Tech Mentor. Specialized in engineering mathematics and science tutoring.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 63,
    name: "Aniket Sinha",
    role: "Teaching & Tech Mentor",
    detailedRole: "Mentor - Teaching & Technical",
    image: "/assets/team1/Aniket_Sinha.jpg",
    email: "aniket.sinha@iitp.ac.in",
    bio: "NSS Teaching & Tech Mentor. Coordinates tech skill workshops and local school tutoring.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 64,
    name: "Vivek Kumar",
    role: "Teaching & Tech Mentor",
    detailedRole: "Mentor - Teaching & Technical",
    image: "/assets/team1/Vivek_Kumar.jpg",
    email: "vivek.kumar@iitp.ac.in",
    bio: "NSS Teaching & Tech Mentor. Focuses on junior high school computer labs and basic math literacy.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 65,
    name: "Tanish R. Chordia",
    role: "Teaching & Tech Mentor",
    detailedRole: "Mentor - Teaching & Technical",
    image: "/assets/team1/Tanish_Chordia.PNG",
    email: "tanish.chordia@iitp.ac.in",
    bio: "NSS Teaching & Tech Mentor. Designs interactive educational models and guides student volunteers.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 66,
    name: "Anil Kumawat",
    role: "Teaching & Tech Mentor",
    detailedRole: "Mentor - Teaching & Technical",
    image: "/assets/team1/Anil_Kumawat.jpg",
    email: "anil.kumawat@iitp.ac.in",
    bio: "NSS Teaching & Tech Mentor. Organizes science experiments and mathematics workshops in rural centers.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 67,
    name: "Ankit Kumar Kero",
    role: "Teaching & Tech Mentor",
    detailedRole: "Mentor - Teaching & Technical",
    image: "/assets/team1/Ankit_Kumar_Kero.jpg",
    email: "ankit.kero@iitp.ac.in",
    bio: "NSS Teaching & Tech Mentor. Inspires kids with basic mechanical science and tech tutorials.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 68,
    name: "Ankesh Kumar",
    role: "Teaching & Tech Mentor",
    detailedRole: "Mentor - Teaching & Technical",
    image: "/assets/team1/Ankesh_Kumar.jpg",
    email: "ankesh.kumar@iitp.ac.in",
    bio: "NSS Teaching & Tech Mentor. Coordinates student attendance logs and standardizes syllabus content.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  // Mentors - Environmental Wing
  {
    id: 69,
    name: "Aditi Kashyap",
    role: "Environmental Wing Mentor",
    detailedRole: "Mentor - Environmental Wing",
    image: "/assets/team1/Aditi_Kashyap.jpg",
    email: "aditi.kashyap@iitp.ac.in",
    bio: "NSS Environmental Wing Mentor. Coordinates tree plantation drives and waste management awareness campaigns.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 70,
    name: "Bhanu Sri",
    role: "Environmental Wing Mentor",
    detailedRole: "Mentor - Environmental Wing",
    image: "/assets/team1/Bhanu_Sri.jpg",
    email: "bhanu.sri@iitp.ac.in",
    bio: "NSS Environmental Wing Mentor. Directs campus cleanliness drives and plastic-free campaigns.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 71,
    name: "Dinker Anand",
    role: "Environmental Wing Mentor",
    detailedRole: "Mentor - Environmental Wing",
    image: "/assets/team1/dinkar_anand.jpeg",
    email: "dinker.anand@iitp.ac.in",
    bio: "NSS Environmental Wing Mentor. Focuses on ecological biodiversity protection and organic farming advocacy.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  // Mentors - Prayatna Wing
  {
    id: 72,
    name: "Mahipal",
    role: "Prayatna Wing Mentor",
    detailedRole: "Mentor - Prayatna Wing",
    image: "/assets/team1/Mahipal_2301MC15.jpeg",
    email: "mahipal@iitp.ac.in",
    bio: "NSS Prayatna Wing Mentor. Drives local children safety campaigns and anti-child-labor street drives.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 73,
    name: "Sai Vardhan",
    role: "Prayatna Wing Mentor",
    detailedRole: "Mentor - Prayatna Wing",
    image: "/assets/team1/Sai vardhan- 2301cs44.jpg",
    email: "sai.vardhan@iitp.ac.in",
    bio: "NSS Prayatna Wing Mentor. Organizes collection drives for underprivileged families and runs local aid campaigns.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 74,
    name: "Yoshita Chowdary",
    role: "Prayatna Wing Mentor",
    detailedRole: "Mentor - Prayatna Wing",
    image: "/assets/team1/Yoshita_Chowdary.jpg",
    email: "yoshita.chowdary@iitp.ac.in",
    bio: "NSS Prayatna Wing Mentor. Focuses on primary school children education support and book distribution drives.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 75,
    name: "Gali Uday Aditya",
    role: "Prayatna Wing Mentor",
    detailedRole: "Mentor - Prayatna Wing",
    image: "/assets/team1/UdayAditya_2301cs71_PrayatnaWing.jpg",
    email: "gali.uday@iitp.ac.in",
    bio: "NSS Prayatna Wing Mentor. Coordinates winter clothing collection camps and student volunteer rosters.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  // Mentors - Rural Development Wing
  {
    id: 76,
    name: "Ravindra Bhati",
    role: "Rural Development Mentor",
    detailedRole: "Mentor - Rural Development Wing",
    image: "/assets/team1/Ravindra_Bhati.jpg",
    email: "ravindra.bhati@iitp.ac.in",
    bio: "NSS Rural Development Wing Mentor. Coordinates village water sanitation programs and agricultural safety seminars.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 77,
    name: "Bhoodev",
    role: "Rural Development Mentor",
    detailedRole: "Mentor - Rural Development Wing",
    image: "/assets/team1/Bhoodev.jpg",
    email: "bhoodev@iitp.ac.in",
    bio: "NSS Rural Development Wing Mentor. Directs rural survey projects, solar power installations, and local council coordination.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 78,
    name: "Riya Singh",
    role: "Rural Development Mentor",
    detailedRole: "Mentor - Rural Development Wing",
    image: "/assets/team1/Riya Singh (2301PH25).jpg",
    email: "riya.singh@iitp.ac.in",
    bio: "NSS Rural Development Wing Mentor. Leads self-help group workshops and financial literacy drives for women in local villages.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  // Mentors - Chetna Wing
  {
    id: 79,
    name: "Neha Reddy Sabbidi",
    role: "Chetna Wing Mentor",
    detailedRole: "Mentor - Chetna Wing",
    image: "/assets/team1/Neha Reddy Sabbidi (2301AI42).jpg",
    email: "neha.reddy@iitp.ac.in",
    bio: "NSS Chetna Wing Mentor. Coordinates health check-up camps, blood donation rosters, and women hygiene awareness programs.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 80,
    name: "Rohit Roy",
    role: "Chetna Wing Mentor",
    detailedRole: "Mentor - Chetna Wing",
    image: "/assets/team1/Rohit_Roy.jpg",
    email: "rohit.roy@iitp.ac.in",
    bio: "NSS Chetna Wing Mentor. Organizes local yoga camps, mental health seminars, and blood donation campaigns.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 81,
    name: "Krishnaveni",
    role: "Chetna Wing Mentor",
    detailedRole: "Mentor - Chetna Wing",
    image: "/assets/team1/Krishnaveni.jpg",
    email: "krishnaveni@iitp.ac.in",
    bio: "NSS Chetna Wing Mentor. Coordinates medical camp logistics, first-aid training, and local healthcare counseling.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  // Mentors - Logistics Wing
  {
    id: 82,
    name: "Meghana Pujari",
    role: "Logistics Wing Mentor",
    detailedRole: "Mentor - Logistics Wing",
    image: "/assets/team1/meghana_pujari.jpg",
    email: "meghana.pujari@iitp.ac.in",
    bio: "NSS Logistics Wing Mentor. Organizes transport logistics, food distribution rosters, and campsite operations.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 83,
    name: "Sameeksha Nagulwad",
    role: "Logistics Wing Mentor",
    detailedRole: "Mentor - Logistics Wing",
    image: "/assets/team1/Sameeksha Nagulwad (2301EC23)_.jpg",
    email: "sameeksha.nagulwad@iitp.ac.in",
    bio: "NSS Logistics Wing Mentor. Specialized in equipment inventory management and volunteer tracking databases.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 84,
    name: "Abhitesh Shukla",
    role: "Logistics Wing Mentor",
    detailedRole: "Mentor - Logistics Wing",
    image: "/assets/team1/Abhitesh_Shukla.jpg",
    email: "abhitesh.shukla@iitp.ac.in",
    bio: "NSS Logistics Wing Mentor. Drives procurement of medical kits, camp supplies, and schedules transportation vehicles.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  // Mentors - Nukkad Wing
  {
    id: 85,
    name: "Nisha",
    role: "Nukkad Wing Mentor",
    detailedRole: "Mentor - Nukkad Wing",
    image: "/assets/team1/Nisha.jpg",
    email: "nisha@iitp.ac.in",
    bio: "NSS Nukkad Wing Mentor. Specialized in screenplay scripting, dramatic direction, and street play scheduling.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 86,
    name: "Udit Sharma",
    role: "Nukkad Wing Mentor",
    detailedRole: "Mentor - Nukkad Wing",
    image: "/assets/team1/Udit_Sharma.jpg",
    email: "udit.sharma@iitp.ac.in",
    bio: "NSS Nukkad Wing Mentor. Acts as senior character lead, directs street plays about clean water, and coordinates performance logistics.",
    category: "mentor",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  // Web Developers
  {
    id: 7,
    name: "Amartya Mondal",
    role: "Lead Developer",
    detailedRole: "Coordinator - Web and App Development",
    image: "/assets/team/atm1504.jpg",
    email: "amartya.mondal@iitp.ac.in",
    bio: "Leads portal programming, check-hours database integration, and guides junior web engineers. Focuses on full-stack portal operations.",
    category: "web",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 8,
    name: "Sajal Kumar",
    role: "Creative Lead",
    detailedRole: "Executive Lead - Creatives and Design",
    image: "/assets/team/jgdcuag - Sajal Kumar.png",
    email: "sajal.kumar@iitp.ac.in",
    bio: "Directs visual layouts, social media campaigns, print poster designs, and coordinates styling across web portals.",
    category: "web",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 9,
    name: "Abhay Patil",
    role: "Developer",
    detailedRole: "Web Developer",
    image: "/assets/team/Abhay Patil.jpg",
    email: "abhay.patil@iitp.ac.in",
    bio: "Focuses on client-side programming, interactive components, responsive stylesheets, and browser optimization updates.",
    category: "web",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: 10,
    name: "Omkar Deshpande",
    role: "Developer",
    detailedRole: "Web Developer",
    image: "/assets/team/20200606_113444 - Omkar Deshpande.jpg",
    email: "omkar.deshpande@iitp.ac.in",
    bio: "Directs database connectors, dynamic table updates, event logs, and guides support integrations.",
    category: "web",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  }
];

// NSS Administration Leadership Hierarchy Data
const LEADERSHIP_TREE = [
  {
    id: "admin-director",
    name: "Prof. T. N. Singh",
    role: "Director, IIT Patna",
    detailedRole: "Patron & Director of IIT Patna",
    image: "/assets/team1/iit-patna-director.jpg",
    email: "director@iitp.ac.in",
    bio: "Patron & Director of IIT Patna. Provides administrative guidance, strategic vision, and structural oversight for all social service activities under the NSS banner.",
    category: "admin",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: "admin-dean",
    name: "Dr. Pramod Tiwari",
    role: "Associate Dean, Student Affairs",
    detailedRole: "Associate Dean of Student Affairs",
    image: "/assets/team1/adean_student_affairs.jpeg",
    email: "adean_student_affairs@iitp.ac.in",
    bio: "Associate Dean of Student Affairs at IIT Patna. Oversees student activity clubs, manages volunteer allocations, and facilitates administrative support and approvals.",
    category: "admin",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: "admin-pic",
    name: "Dr. Somanath Pradhan",
    role: "Professor in Charge, NSS",
    detailedRole: "Professor in Charge, NSS",
    image: "/assets/team1/spradhan.jpg",
    email: "pic_nss@iitp.ac.in",
    bio: "NSS Professor in Charge. Steers academic integrations, faculty advisory boards, central community service campaigns, and local village developmental camps.",
    category: "admin",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: "admin-security",
    name: "Mr. Deepak Chaurasia",
    role: "Security Officer & NSS Advisor",
    detailedRole: "Security Officer & NSS Advisor",
    image: "/assets/team1/deepakch.jpeg",
    email: "security@iitp.ac.in",
    bio: "Security Officer & NSS Advisor. Supervises student outreach safety protocols, transit logistics, campus emergency services, and operational compliance.",
    category: "admin",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: "admin-committee1",
    name: "Kiran Ravi",
    role: "Core Committee Advisor",
    detailedRole: "Core Committee Advisor",
    image: "/assets/team1/karan_Ravi.jpg",
    email: "kiran.ravi@iitp.ac.in",
    bio: "Core Committee Advisor. Advises on local school tutoring campaigns, literacy syllabi, women empowerment initiatives, and children healthcare camps.",
    category: "admin",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  },
  {
    id: "admin-committee2",
    name: "Subham",
    role: "Core Committee Advisor",
    detailedRole: "Core Committee Advisor",
    image: "/assets/team1/subham_kumar.jpg",
    email: "subham@iitp.ac.in",
    bio: "Core Committee Advisor. Advises on ecological plantation setups, rural agricultural support systems, healthcare drives, and medical campaigns.",
    category: "admin",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  }
];

export default function OurTeam() {
  const [selectedYear, setSelectedYear] = useState('2025-26');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  // Donation Form States
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donationAmount, setDonationAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDonateSuccess, setIsDonateSuccess] = useState(false);

  // Get active administrative leadership tree based on selected year
  const activeLeadershipTree = useMemo(() => {
    const director = LEADERSHIP_TREE[0];
    const dean = LEADERSHIP_TREE[1];
    const security = LEADERSHIP_TREE[3];
    const committee1 = LEADERSHIP_TREE[4];
    const committee2 = LEADERSHIP_TREE[5];

    if (selectedYear === "2025-26") {
      return [
        director,
        dean,
        LEADERSHIP_TREE[2], // Dr. Ranjeet Ranjan Jha
        security,
        committee1,
        committee2
      ];
    } else {
      return [
        director,
        dean,
        {
          id: "admin-pic-former",
          name: "Dr. Shailesh K. Pandey",
          role: "Professor in Charge, NSS",
          detailedRole: "Professor in Charge (Former)",
          image: "/assets/team1/pic_nss.jpeg",
          email: "pic_former@iitp.ac.in",
          bio: "NSS Professor in Charge for 2024-25. Directed faculty committees, local project allocations, and coordinated village medical outreach programs.",
          category: "admin",
          linkedin: "https://linkedin.com",
          github: "https://github.com"
        },
        security,
        committee1,
        committee2
      ];
    }
  }, [selectedYear]);

  // Get active student core team based on selected year
  const activeTeamMembers = useMemo(() => {
    if (selectedYear === "2025-26") {
      return TEAM_MEMBERS;
    } else {
      return [
        {
          id: 2,
          name: "Rabi Kumar Shaw",
          role: "General Secretary",
          detailedRole: "General Secretary (2024-25)",
          image: "/assets/team1/Rabi_kumar.jpg",
          email: "rabi.kumar@iitp.ac.in",
          bio: "General Secretary of NSS IIT Patna for the 2024-25 tenure. Led student outreach projects, community services, and coordinate local school initiatives.",
          category: "secretary",
          linkedin: "https://linkedin.com",
          github: "https://github.com"
        },
        {
          id: 1,
          name: "Ade Balakrishna",
          role: "Cell Secretary",
          detailedRole: "Secretary - Logistics & Outreach",
          image: "/assets/team1/Ade_Balakrishna.jpg",
          email: "ade.balakrishna@iitp.ac.in",
          bio: "Coordinated volunteer transportation, inventory support operations, and directed large-scale village camps logistics.",
          category: "core",
          linkedin: "https://linkedin.com",
          github: "https://github.com"
        },
        {
          id: 3,
          name: "PR Veronica",
          role: "Cell Secretary",
          detailedRole: "Secretary - Environmental & Chetna",
          image: "/assets/team1/podili_Ruby_Veronica.jpg",
          email: "pr.veronica@iitp.ac.in",
          bio: "Coordinates clean-up campaigns, rural plantation drives, and local health-hygiene education programs. Directs voluntary action plans and manages ecological schedules.",
          category: "core",
          linkedin: "https://linkedin.com",
          github: "https://github.com"
        },
        {
          id: 4,
          name: "Sudhanshu Shekhar",
          role: "Cell Secretary",
          detailedRole: "Secretary - Rural Development",
          image: "/assets/team1/Sudhanshu_Kumar.jpg",
          email: "sudhanshu.kumar@iitp.ac.in",
          bio: "Drives rural outreach, agricultural expansion programs, and self-help group setups. Directs collaboration with local panchayat committees.",
          category: "core",
          linkedin: "https://linkedin.com",
          github: "https://github.com"
        },
        {
          id: 5,
          name: "Rishav Shivare",
          role: "Secretary",
          detailedRole: "Secretary - Nukkad Awareness",
          image: "/assets/team1/Rishabh_shivhare.jpg",
          email: "rishav.shivare@iitp.ac.in",
          bio: "Directs scriptwriting and schedules street plays (Nukkad Natak) about vital social issues. Manages event schedules and outreach locations.",
          category: "core",
          linkedin: "https://linkedin.com",
          github: "https://github.com"
        },
        {
          id: 6,
          name: "Ayushman Singh",
          role: "Secretary",
          detailedRole: "Secretary - Logistics Team",
          image: "/assets/team1/Ayushman_singh.jpg",
          email: "ayushman.singh@iitp.ac.in",
          bio: "Directs transportation logistics, inventory allocation, and support systems during large camps. Coordinates supply distributions across villages.",
          category: "core",
          linkedin: "https://linkedin.com",
          github: "https://github.com"
        },
        {
          id: 101,
          name: "Harshvardhan Singh",
          role: "Cell Secretary",
          detailedRole: "Secretary - Teaching & Tech",
          image: "/assets/team/20191020_144529 - harshvardhan singh.jpg",
          email: "harsh@iitp.ac.in",
          bio: "Led rural high school computer classes, spoken English seminars, and designed lesson templates for volunteers.",
          category: "core",
          linkedin: "https://linkedin.com",
          github: "https://github.com"
        },
        {
          id: 7,
          name: "Amartya Mondal",
          role: "Lead Developer",
          detailedRole: "Coordinator - Web and App Development",
          image: "/assets/team/atm1504.jpg",
          email: "amartya.mondal@iitp.ac.in",
          bio: "Leads portal programming, check-hours database integration, and guides junior web engineers. Focuses on full-stack portal operations.",
          category: "web",
          linkedin: "https://linkedin.com",
          github: "https://github.com"
        },
        {
          id: 8,
          name: "Sajal Kumar",
          role: "Creative Lead",
          detailedRole: "Executive Lead - Creatives and Design",
          image: "/assets/team/jgdcuag - Sajal Kumar.png",
          email: "sajal.kumar@iitp.ac.in",
          bio: "Directs visual layouts, social media campaigns, print poster designs, and coordinates styling across web portals.",
          category: "web",
          linkedin: "https://linkedin.com",
          github: "https://github.com"
        },
        {
          id: 102,
          name: "Hrishita Mishra",
          role: "Web Developer",
          detailedRole: "Web Developer (Former)",
          image: "/assets/team/20200606_000422 - Hrishita Mishra.jpg",
          email: "hrishita@iitp.ac.in",
          bio: "Contributed client-side portal integrations, interactive user forms, responsive stylesheets, and database connectors.",
          category: "web",
          linkedin: "https://linkedin.com",
          github: "https://github.com"
        },
        {
          id: 9,
          name: "Abhay Patil",
          role: "Developer",
          detailedRole: "Web Developer",
          image: "/assets/team/Abhay Patil.jpg",
          email: "abhay.patil@iitp.ac.in",
          bio: "Focuses on client-side programming, interactive components, responsive stylesheets, and browser optimization updates.",
          category: "web",
          linkedin: "https://linkedin.com",
          github: "https://github.com"
        },
        {
          id: 10,
          name: "Omkar Deshpande",
          role: "Developer",
          detailedRole: "Web Developer",
          image: "/assets/team/20200606_113444 - Omkar Deshpande.jpg",
          email: "omkar.deshpande@iitp.ac.in",
          bio: "Directs database connectors, dynamic table updates, event logs, and guides support integrations.",
          category: "web",
          linkedin: "https://linkedin.com",
          github: "https://github.com"
        }
      ];
    }
  }, [selectedYear]);

  // Filtering Logic
  const filteredMembers = useMemo(() => {
    return activeTeamMembers.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.detailedRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTab = activeFilter === 'all' || member.category === activeFilter;

      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeFilter, activeTeamMembers]);

  // Grouped and Filtered data for presentation
  const secretaryMembers = useMemo(() => filteredMembers.filter(m => m.category === 'secretary'), [filteredMembers]);
  const coreMembers = useMemo(() => filteredMembers.filter(m => m.category === 'core'), [filteredMembers]);
  const pgMembers = useMemo(() => filteredMembers.filter(m => m.category === 'pg'), [filteredMembers]);
  const mentorMembers = useMemo(() => filteredMembers.filter(m => m.category === 'mentor'), [filteredMembers]);
  const webMembers = useMemo(() => filteredMembers.filter(m => m.category === 'web'), [filteredMembers]);

  // Donation Handler
  const handleDonateSubmit = (e) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : donationAmount;

    if (!finalAmount || finalAmount <= 0) {
      alert("Please select or enter a valid donation amount.");
      return;
    }

    setIsProcessing(true);

    // Simulate Secure Gateway Interaction
    setTimeout(() => {
      setIsProcessing(false);
      setIsDonateSuccess(true);
    }, 1500);
  };

  const closeDonateModal = () => {
    setIsDonateOpen(false);
    // Delay resetting to prevent visual jump during closing animation
    setTimeout(() => {
      setDonorName('');
      setDonorEmail('');
      setDonationAmount(500);
      setCustomAmount('');
      setIsDonateSuccess(false);
    }, 400);
  };

  return (
    <div className="team-page-container">
      {/* Dynamic Ambient Blur Circles */}
      <div className="bg-blur-circle bg-blur-1"></div>
      <div className="bg-blur-circle bg-blur-2"></div>

      {/* Top Header Row: Title & Year Selector Dropdown */}
      <div className="team-header-row">
        <motion.section
          className="intro-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Our Team</h1>
          
          <p className="intro-text mt-4 text-slate-500 max-w-3xl">
            The driving force behind NSS IIT Patna. Our general secretary, core cell secretaries, and developers work passionately together to orchestrate outreach campaigns, educational services, and rural development efforts.
          </p>
        </motion.section>

        <motion.div 
          className="year-selector-container"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <label htmlFor="year-select" className="year-select-label">Select Roster Year</label>
          <select 
            id="year-select" 
            className="year-select-dropdown" 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="2025-26">2025 - 2026</option>
            <option value="2024-25">2024 - 2025</option>
          </select>
        </motion.div>
      </div>

      {/* Leadership Hierarchy flowchart */}
      <section className="hierarchy-section">
        <div className="tree-container">
          
          {/* Tier 1: Director */}
          <motion.div 
            className="tree-tier"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="tree-node node-highlight" onClick={() => setSelectedMember(activeLeadershipTree[0])}>
              <div className="node-avatar-wrapper">
                <img src={activeLeadershipTree[0].image} alt={activeLeadershipTree[0].name} className="node-avatar" />
              </div>
              <span className="node-role-tag">Director</span>
              <h4 className="node-admin-name">{activeLeadershipTree[0].name}</h4>
            </div>
          </motion.div>

          <div className="tree-line-v"></div>

          {/* Tier 2: Dean Student Affairs */}
          <motion.div 
            className="tree-tier"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="tree-node node-highlight" onClick={() => setSelectedMember(activeLeadershipTree[1])}>
              <div className="node-avatar-wrapper">
                <img src={activeLeadershipTree[1].image} alt={activeLeadershipTree[1].name} className="node-avatar" />
              </div>
              <span className="node-role-tag">Dean Student Affairs</span>
              <h4 className="node-admin-name">{activeLeadershipTree[1].name}</h4>
            </div>
          </motion.div>

          <div className="tree-line-v"></div>

          {/* Tier 3: PIC & Security Officer */}
          <motion.div 
            className="tree-branch-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="tree-branch-row">
              {/* PIC */}
              <div className="tree-branch-col">
                <div className="tree-node" onClick={() => setSelectedMember(activeLeadershipTree[2])}>
                  <div className="node-avatar-wrapper">
                    <img src={activeLeadershipTree[2].image} alt={activeLeadershipTree[2].name} className="node-avatar" />
                  </div>
                  <span className="node-role-tag">Professor in Charge</span>
                  <h4 className="node-admin-name">{activeLeadershipTree[2].name}</h4>
                </div>
              </div>
              {/* Security Officer */}
              <div className="tree-branch-col">
                <div className="tree-node" onClick={() => setSelectedMember(activeLeadershipTree[3])}>
                  <div className="node-avatar-wrapper">
                    <img src={activeLeadershipTree[3].image} alt={activeLeadershipTree[3].name} className="node-avatar" />
                  </div>
                  <span className="node-role-tag">Security Officer</span>
                  <h4 className="node-admin-name">{activeLeadershipTree[3].name}</h4>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="tree-line-v"></div>

          {/* Tier 4: Core Committee Advisors */}
          <motion.div 
            className="tree-branch-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="tree-branch-row">
              {/* Advisor 1 */}
              <div className="tree-branch-col">
                <div className="tree-node" onClick={() => setSelectedMember(activeLeadershipTree[4])}>
                  <div className="node-avatar-wrapper">
                    <img src={activeLeadershipTree[4].image} alt={activeLeadershipTree[4].name} className="node-avatar" />
                  </div>
                  <span className="node-role-tag">Core Committee</span>
                  <h4 className="node-admin-name">{activeLeadershipTree[4].name}</h4>
                </div>
              </div>
              {/* Advisor 2 */}
              <div className="tree-branch-col">
                <div className="tree-node" onClick={() => setSelectedMember(activeLeadershipTree[5])}>
                  <div className="node-avatar-wrapper">
                    <img src={activeLeadershipTree[5].image} alt={activeLeadershipTree[5].name} className="node-avatar" />
                  </div>
                  <span className="node-role-tag">Core Committee</span>
                  <h4 className="node-admin-name">{activeLeadershipTree[5].name}</h4>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="tree-line-v"></div>

          {/* Tier 5: Gensec & Core Leads Branch */}
          <motion.div 
            className="tree-branch-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="tree-branch-row">
              {/* General Secretary */}
              <div className="tree-branch-col">
                <div className="tree-node" onClick={() => setSelectedMember(activeTeamMembers.find(m => m.category === 'secretary'))}>
                  <div className="node-avatar-wrapper">
                    <img src={activeTeamMembers.find(m => m.category === 'secretary')?.image} alt="Gensec" className="node-avatar" />
                  </div>
                  <span className="node-role-tag">General Secretary</span>
                  <h4 className="node-admin-name">{activeTeamMembers.find(m => m.category === 'secretary')?.name}</h4>
                </div>
              </div>
              {/* Core Student Leads Anchor */}
              <div className="tree-branch-col">
                <div className="tree-node" onClick={() => {
                  const el = document.getElementById('search-directory-anchor');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}>
                  <div className="node-avatar-wrapper">
                    <img src="/assets/team1/podili_Ruby_Veronica.jpg" alt="Student Leads" className="node-avatar" />
                  </div>
                  <span className="node-role-tag">NSS Student Cell Leads</span>
                  <h4 className="node-admin-name">Core Leads</h4>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Anchor point to scroll to student directory */}
      <div id="search-directory-anchor" style={{ scrollMarginTop: '100px' }}></div>

      {/* Search and Filters */}
      <motion.section
        className="search-filter-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="filter-controls">
          <div className="search-box">
            <FaMagnifyingGlass className="search-icon" />
            <input
              type="text"
              placeholder="Search by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-tabs">
            <button
              className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Roles
            </button>
            <button
              className={`filter-tab ${activeFilter === 'secretary' ? 'active' : ''}`}
              onClick={() => setActiveFilter('secretary')}
            >
              Secretaries
            </button>
            <button
              className={`filter-tab ${activeFilter === 'core' ? 'active' : ''}`}
              onClick={() => setActiveFilter('core')}
            >
              Core Leads
            </button>
            <button
              className={`filter-tab ${activeFilter === 'pg' ? 'active' : ''}`}
              onClick={() => setActiveFilter('pg')}
            >
              PG Reps
            </button>
            <button
              className={`filter-tab ${activeFilter === 'mentor' ? 'active' : ''}`}
              onClick={() => setActiveFilter('mentor')}
            >
              Mentors
            </button>
            <button
              className={`filter-tab ${activeFilter === 'web' ? 'active' : ''}`}
              onClick={() => setActiveFilter('web')}
            >
              Web Devs
            </button>
          </div>
        </div>
      </motion.section>

      {/* Directory Categories */}
      <section className="team-directory">

        {/* General Secretary Group */}
        {secretaryMembers.length > 0 && (
          <motion.div
            className="team-category-group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="category-header">
              <h2 className="category-title text-2xl font-bold">General Secretary</h2>
              <span className="category-count">{secretaryMembers.length} member{secretaryMembers.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="team-grid">
              {secretaryMembers.map((member, i) => (
                <TeamCard
                  key={member.id}
                  member={member}
                  index={i}
                  onQuickView={setSelectedMember}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Core Leads Group */}
        {coreMembers.length > 0 && (
          <motion.div
            className="team-category-group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="category-header">
              <h2 className="category-title text-2xl font-bold">Core Leads</h2>
              <span className="category-count">{coreMembers.length} member{coreMembers.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="team-grid">
              {coreMembers.map((member, i) => (
                <TeamCard
                  key={member.id}
                  member={member}
                  index={i}
                  onQuickView={setSelectedMember}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* PG Representatives Group */}
        {pgMembers.length > 0 && (
          <motion.div
            className="team-category-group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="category-header">
              <h2 className="category-title text-2xl font-bold">PG Representatives</h2>
              <span className="category-count">{pgMembers.length} member{pgMembers.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="team-grid">
              {pgMembers.map((member, i) => (
                <TeamCard
                  key={member.id}
                  member={member}
                  index={i}
                  onQuickView={setSelectedMember}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Mentors Group */}
        {mentorMembers.length > 0 && (
          <motion.div
            className="team-category-group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="category-header">
              <h2 className="category-title text-2xl font-bold">Mentors</h2>
              <span className="category-count">{mentorMembers.length} member{mentorMembers.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="team-grid">
              {mentorMembers.map((member, i) => (
                <TeamCard
                  key={member.id}
                  member={member}
                  index={i}
                  onQuickView={setSelectedMember}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Web Developers Group */}
        {webMembers.length > 0 && (
          <motion.div
            className="team-category-group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="category-header">
              <h2 className="category-title text-2xl font-bold">Web Developers</h2>
              <span className="category-count">{webMembers.length} member{webMembers.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="team-grid">
              {webMembers.map((member, i) => (
                <TeamCard
                  key={member.id}
                  member={member}
                  index={i}
                  onQuickView={setSelectedMember}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <motion.div
            className="search-empty-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="empty-icon text-slate-300 text-5xl mb-4">😢</div>
            <h3>No members found</h3>
            <p>Try searching for a different name or choosing another role filter.</p>
          </motion.div>
        )}
      </section>

      {/* Call to Action for Donation */}
      <motion.section
        className="cta-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <button
          className="btn-cta-donate"
          onClick={() => setIsDonateOpen(true)}
        >
          Support Our Initiatives
        </button>
      </motion.section>

      {/* Interactive Profile Details Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="modal-overlay active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target.classList.contains('modal-overlay') && setSelectedMember(null)}
          >
            <motion.div
              className="modal-card"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button
                className="modal-close-btn"
                onClick={() => setSelectedMember(null)}
                aria-label="Close Profile details"
              >
                &times;
              </button>
              <div className="modal-body">
                <div className="modal-profile-aside">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="modal-profile-img"
                  />
                </div>
                <div className="modal-profile-content">
                  <span className="modal-tag">NSS Roster</span>
                  <h3 className="modal-name">{selectedMember.name}</h3>
                  <p className="modal-role">{selectedMember.detailedRole}</p>
                  <hr className="modal-divider" />
                  <p className="modal-section-title">Biography / Roles</p>
                  <p className="modal-bio">{selectedMember.bio}</p>
                  <p className="modal-section-title">Connect & Contact</p>
                  <div className="modal-contact-row">
                    <a href={`mailto:${selectedMember.email}`} className="btn-modal-contact">
                      <FaEnvelope /> Email Coordinator
                    </a>
                    <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="btn-modal-contact secondary">
                      <FaLinkedinIn /> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Donate Modal */}
      <AnimatePresence>
        {isDonateOpen && (
          <motion.div
            className="modal-overlay active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target.classList.contains('modal-overlay') && closeDonateModal()}
          >
            <motion.div
              className="modal-card donate-card"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button
                className="modal-close-btn"
                onClick={closeDonateModal}
                aria-label="Close Donation"
              >
                &times;
              </button>

              {!isDonateSuccess ? (
                <>
                  <div className="donate-header">
                    <div className="donate-icon-badge">
                      <FaHeart />
                    </div>
                    <h3>Support NSS IIT Patna</h3>
                    <p>Your generous contribution drives impactful social outreach programs, rural literacy drives, and ecological plantation camps.</p>
                  </div>
                  <div className="donate-body">
                    <form onSubmit={handleDonateSubmit}>
                      <div className="form-group">
                        <label htmlFor="donorName">Full Name</label>
                        <input
                          type="text"
                          id="donorName"
                          placeholder="Enter your name"
                          required
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="donorEmail">Email Address</label>
                        <input
                          type="email"
                          id="donorEmail"
                          placeholder="you@example.com"
                          required
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Select Contribution (INR)</label>
                        <div className="donate-amount-options">
                          {[500, 1000, 2500, 5000].map((amt) => (
                            <button
                              key={amt}
                              type="button"
                              className={`amount-btn ${donationAmount === amt && !customAmount ? 'active' : ''}`}
                              onClick={() => {
                                setDonationAmount(amt);
                                setCustomAmount('');
                              }}
                            >
                              ₹{amt}
                            </button>
                          ))}
                          <div className="custom-amount-input">
                            <span>₹</span>
                            <input
                              type="number"
                              placeholder="Other"
                              value={customAmount}
                              onChange={(e) => {
                                setCustomAmount(e.target.value);
                                setDonationAmount(0);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn-donate-submit"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing Security Layer...' : 'Proceed to Secure Donation'}
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="donate-success-view">
                  <div className="success-icon">
                    <FaCircleCheck />
                  </div>
                  <h3>Thank you for your generosity, {donorName}!</h3>
                  <p>We have simulated the transaction layer and sent secure receipt confirmations to <strong>{donorEmail}</strong>. Your support directly funds outreach drives across rural Bihar.</p>
                  <button
                    type="button"
                    className="btn-donate-success-close animate-bounce"
                    onClick={closeDonateModal}
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-component: Individual Team Member Card
function TeamCard({ member, index, onQuickView }) {
  const cardBorderClass = member.category === 'secretary'
    ? 'card-secretary'
    : member.category === 'core'
      ? 'card-core'
      : 'card-web';

  return (
    <motion.div
      className={`team-card ${cardBorderClass}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.05 + 0.1, type: "spring", stiffness: 100 }}
    >
      <div className="card-img-container">
        <img
          src={member.image}
          alt={member.name}
          className="member-img"
        />
        <div className="card-overlay">
          <button
            className="btn-quick-view"
            onClick={() => onQuickView(member)}
          >
            <FaCircleInfo /> View Details
          </button>
        </div>
      </div>
      <div className="card-info">
        <h3 className="member-name">{member.name}</h3>
        <p className="member-role">{member.role}</p>
        <div className="member-socials">
          <a href={`mailto:${member.email}`} className="social-link" title="Email">
            <FaEnvelope />
          </a>
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a href={member.github} target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
            <FaGithub />
          </a>
        </div>
      </div>
    </motion.div>
  );
}