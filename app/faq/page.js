"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  HelpCircle,
  X,
  Mail,
  BookOpen,
  Cpu,
  HeartHandshake,
  Users,
  Leaf,
  Lightbulb,
  MapPin,
  PhoneCall
} from "lucide-react";
import "./faq.css";

const FAQ_DATA = [
  // Basics
  {
    id: "b1",
    category: "Basics",
    question: "In case of confusions regarding the plans who is responsible to make overall decision?",
    answer: "The General Secretary under Guidance of Professor Incharge is responsible for making the final decisions."
  },
  {
    id: "b2",
    category: "Basics",
    question: "In the events like plantation drives and cleanliness, can a member other than a student participate?",
    answer: "Yes, members other than students can actively participate in plantation drives and cleanliness campaigns."
  },
  {
    id: "b3",
    category: "Basics",
    question: "Can a member of one cell do service in other cell?",
    answer: "Yes, by informing the mentor of the parent cell a member can give their service in some other cell also. However, the member remains responsible to complete the primary responsibility of their parent cell."
  },
  {
    id: "b4",
    category: "Basics",
    question: "Is scope of NSS IITP limited to in and around the campus?",
    answer: "Presently we are working on problems in and around campus, but in the future we are planning to expand our scope to other parts of Patna."
  },

  // Technical Skills
  {
    id: "t1",
    category: "Technical Skills",
    question: "What is taught under this group?",
    answer: "NSS technical skills group includes teaching:\n• Spoken English\n• Basic computer knowledge"
  },
  {
    id: "t2",
    category: "Technical Skills",
    question: "Are theory classes accompanied with practical sessions as well?",
    answer: "Yes, computer classes are made highly interactive by giving hands-on practical lessons to the students."
  },
  {
    id: "t3",
    category: "Technical Skills",
    question: "How many hours of classes are conducted in a week?",
    answer: "We conduct 4 hours of English class and 4 hours of Computer class weekly."
  },

  // Rural Development
  {
    id: "r1",
    category: "Rural Development",
    question: "What is the concerned area in which Rural Development executes its Plans?",
    answer: "The plans are executed primarily for the people of Amhara village near the Campus of IIT Patna."
  },
  {
    id: "r2",
    category: "Rural Development",
    question: "Does it provide financial support to women and their family?",
    answer: "The Rural Development group holds a strong motive to help women and farmers build self-help groups for sustainable financial empowerment."
  },
  {
    id: "r3",
    category: "Rural Development",
    question: "Besides Startups how does the RD group help the women?",
    answer: "It guides them regarding proper health, sanitation issues, and general wellness practices."
  },
  {
    id: "r4",
    category: "Rural Development",
    question: "How do the people of the Village approach for their problems?",
    answer: "Contact numbers of NSS team members including the Head and Mentors are distributed directly to the villagers for easy communication."
  },
  {
    id: "r5",
    category: "Rural Development",
    question: "In case of any Guidance regarding startup ideas, where do the Volunteers get help from?",
    answer: "The members and volunteers are continuously guided throughout by the NSS General Secretary and the mentors."
  },

  // Teaching
  {
    id: "edu1",
    category: "Teaching",
    question: "Are the children taught within the campus?",
    answer: "Children are taught in the Amhara High School in Amhara village. Our team members reach on allotted times to teach them locally."
  },
  {
    id: "edu2",
    category: "Teaching",
    question: "Are there regular tests conducted to check the performance of children?",
    answer: "Yes, the members conduct regular periodic tests in order to evaluate and track their academic progress."
  },

  // Environment
  {
    id: "env1",
    category: "Environment",
    question: "Are any cleanliness drives being held outside the campus where there is actually need of cleanliness?",
    answer: "Till now the cleanliness drives have been organised inside the campus, but we plan to organise cleanliness drives outside the campus in nearby rural areas in upcoming months."
  },
  {
    id: "env2",
    category: "Environment",
    question: "What are basic waste management techniques to make the surroundings clean?",
    answer: "For the disposal of waste inside the campus, designated dustbins are placed at regular intervals. Two types of dustbins are kept: one for dry waste and the other for wet waste. Regular campus cleanliness drives are also organised."
  },
  {
    id: "env3",
    category: "Environment",
    question: "What are the basic processes to manage waste in marriages and celebrations etc? How to dispose large scale waste?",
    answer: "Leftover hygienic food can be distributed amongst those in need. Food wastes can be collected and transported to irrigation fields to be dumped and mixed with soil as organic manure. Inedible waste (like plastics) is collected and sent for recycling."
  },
  {
    id: "env4",
    category: "Environment",
    question: "On what all basis are the locations chosen for plantation?",
    answer: "Plantation is done on locations that are void of commercial traffic, where soil is not cemented, and where trees beautify the landscape. Also, care is taken to ensure no other plant is in the immediate vicinity to prevent competition for water and nutrients."
  },
  {
    id: "env5",
    category: "Environment",
    question: "What sort of plants are considered under plantation?",
    answer: "Considering the presence of Nilgais on campus, we select tree species that aren't eaten by them. Currently, Sheesham and Arjuna trees have been identified as the most viable and hardy plants for campus plantation."
  },

  // Prerna (Chetna & Prayatna)
  {
    id: "c1",
    category: "Prerna",
    question: "What is the function of CHETNA team?",
    answer: "CHETNA team believes that awareness plays a crucial role in making any societal initiative successful. Our team spreads awareness related to events of other NSS cells as well as vital government schemes. We also frequently conduct village surveys to identify and solve societal problems."
  },
  {
    id: "c2",
    category: "Prerna",
    question: "What are the various methods through which CHETNA team raise awareness in the society?",
    answer: "We raise awareness through multiple engaging channels:\n• Host educational events (poster making competitions, online/offline quizzes, slogan writing).\n• Host social events (street plays/Nukkad Natak, stage plays based on burning social issues).\n• Post informative articles and posters across digital networks.\n• Organise mass campaigns to connect with large public audiences."
  },
  {
    id: "c3",
    category: "Prerna",
    question: "How decisions are taken in the team?",
    answer: "Decisions are taken via joint meetings of team members, mentors, and the NSS General Secretary. If necessary, strategic advice is taken from the Professor Incharge (PIC) NSS."
  },
  {
    id: "c4",
    category: "Prerna",
    question: "Are your awareness programs bounded to your campus only?",
    answer: "No, our awareness campaigns extend well beyond the campus to nearby communities, schools, and villages."
  },
  {
    id: "p1",
    category: "Prerna",
    question: "What topics are taught in Prayatna?",
    answer: "School students are taught various curriculum topics in a structured manner so that their school syllabus is properly covered and foundational concepts are thoroughly solidified."
  },
  {
    id: "p2",
    category: "Prerna",
    question: "What was the need to start Prayatna?",
    answer: "Prayatna was initiated to deliver quality education and mentorship to underprivileged students in nearby areas who lacked proper educational guidance, infrastructure, and teaching support."
  },
  {
    id: "p3",
    category: "Prerna",
    question: "How are the doubts of students cleared?",
    answer: "Dedicated time is allotted in every session specifically for clearing doubts. After each sub-topic is taught, students are encouraged to ask questions. Students can also reach out to student teachers via phone calls for urgent academic assistance."
  },
  {
    id: "p4",
    category: "Prerna",
    question: "Who manages Prayatna and takes decisions?",
    answer: "Prayatna is governed by a dedicated Core Team chosen according to the Prayatna Rule Book, primarily consisting of 3rd-year student leaders who manage operations and make executive decisions."
  }
];

const CATEGORIES = [
  { id: "Basics", label: "Basics", icon: BookOpen },
  { id: "Technical Skills", label: "Technical Skills", icon: Cpu },
  { id: "Rural Development", label: "Rural Development", icon: HeartHandshake },
  { id: "Teaching", label: "Teaching", icon: Users },
  { id: "Environment", label: "Environment", icon: Leaf },
  { id: "Prerna", label: "Prerna Wing", icon: Lightbulb }
];

export default function FAQPage() {
  const [activeSection, setActiveSection] = useState("Basics");
  const [searchQuery, setSearchQuery] = useState("");
  const [openAccordionIds, setOpenAccordionIds] = useState([]);

  const isManualScroll = useRef(false);
  const manualScrollTimeout = useRef(null);

  const toggleAccordion = (id) => {
    setOpenAccordionIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter(faq => {
      const matchesSearch = searchQuery.trim() === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

  const groupedFAQs = useMemo(() => {
    const groups = {};
    CATEGORIES.forEach(cat => {
      const items = filteredFAQs.filter(f => f.category === cat.id);
      if (items.length > 0) {
        groups[cat.id] = {
          label: cat.label,
          items: items
        };
      }
    });
    return groups;
  }, [filteredFAQs]);

  const handleCategoryClick = (catId) => {
    setActiveSection(catId);
    isManualScroll.current = true;
    if (manualScrollTimeout.current) {
      clearTimeout(manualScrollTimeout.current);
    }

    const element = document.getElementById(`faq-section-${catId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }

    manualScrollTimeout.current = setTimeout(() => {
      isManualScroll.current = false;
    }, 800);
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      return;
    }

    const sections = CATEGORIES.map(cat =>
      document.getElementById(`faq-section-${cat.id}`)
    ).filter(Boolean);

    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      if (isManualScroll.current) return;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id.replace("faq-section-", "");
          setActiveSection(sectionId);
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    const handleScroll = () => {
      if (isManualScroll.current) return;

      if (window.scrollY < 200) {
        setActiveSection("Basics");
        return;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        const lastCat = CATEGORIES[CATEGORIES.length - 1];
        setActiveSection(lastCat.id);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      sections.forEach(section => observer.unobserve(section));
      window.removeEventListener("scroll", handleScroll);
      if (manualScrollTimeout.current) {
        clearTimeout(manualScrollTimeout.current);
      }
    };
  }, [searchQuery]);

  return (
    <div className="faq-page-container">
      {/* Ambient Background Blobs */}
      <div className="faq-bg-blur faq-blur-1"></div>
      <div className="faq-bg-blur faq-blur-2"></div>

      {/* Top Contact Us Section */}
      <section className="faq-hero" style={{ borderBottom: "none", paddingBottom: "10px" }}>
        <h1 className="faq-title">Contact Us</h1>
        <p className="faq-subtitle">
          Need assistance or looking for answers? Reach out to our team directly or browse our frequently asked questions below.
        </p>
      </section>

      <section className="faq-top-contact" style={{ marginBottom: "50px" }}>
        <div className="faq-contact-card">
          <div className="faq-contact-icon-box">
            <Mail className="w-6 h-6" />
          </div>
          <div className="faq-contact-info">
            <h4>Email Us</h4>
            <p>Drop us a line for volunteering or query resolution.</p>
            <a href="mailto:nss@iitp.ac.in">nss@iitp.ac.in</a>
          </div>
        </div>

        <div className="faq-contact-card">
          <div className="faq-contact-icon-box">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="faq-contact-info">
            <h4>Visit Office</h4>
            <p>Admin Building, IIT Patna, Bihta, Patna - 801106</p>
            <span className="text-xs font-bold text-slate-400 uppercase">Mon-Fri (9am - 5pm)</span>
          </div>
        </div>

        <div className="faq-contact-card">
          <div className="faq-contact-icon-box">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div className="faq-contact-info">
            <h4>General Secretary</h4>
            <a href="mailto:nss_gen_sec@iitp.ac.in">nss_gen_sec@iitp.ac.in</a>
          </div>
        </div>
      </section>

      {/* Interactive Google Map */}
      <section className="faq-map-container">
        <div className="faq-map-box">
          <iframe
            src="https://www.google.com/maps?q=Indian+Institute+of+Technology+Patna,+Bihta&output=embed"
            className="faq-map-iframe"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="IIT Patna Google Map Location"
          ></iframe>
        </div>
      </section>

      {/* FAQ Header Section */}
      <section className="faq-hero" style={{ paddingTop: "50px", borderTop: "1px solid #e2e8f0" }}>
        <h2 className="faq-title" style={{ fontSize: "36px" }}>Frequently Asked Questions</h2>
        <p className="faq-subtitle">
          Find instant answers to common queries about NSS IIT Patna, volunteering hours, and initiatives.
        </p>

        {/* Search Bar */}
        <div className="faq-search-wrapper">
          <input
            type="text"
            className="faq-search-input"
            placeholder="Search questions or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="faq-search-icon" />
          {searchQuery && (
            <button className="faq-clear-btn" onClick={() => setSearchQuery("")} title="Clear search">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <div className="faq-main-layout">
        {/* Left Column: Sticky Sidebar Navigation */}
        <aside className="faq-sidebar">
          <div className="faq-sidebar-title">Categories</div>
          <nav className="faq-sidebar-nav">
            {CATEGORIES.map((cat) => {
              const count = cat.id === "All"
                ? FAQ_DATA.length
                : FAQ_DATA.filter(f => f.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`faq-sidebar-btn ${activeSection === cat.id ? "active" : ""}`}
                >
                  <span>{cat.label}</span>
                  <span className="faq-sidebar-count">{count}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right Column: Accordion Lists */}
        <main className="faq-content-column">
          {Object.keys(groupedFAQs).length === 0 ? (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl">
              <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">No questions found</h3>
              <p className="text-sm text-slate-500">
                No results match &quot;{searchQuery}&quot;. Try adjusting your keywords.
              </p>
            </div>
          ) : (
            Object.entries(groupedFAQs).map(([categoryId, group]) => (
              <div key={categoryId} id={`faq-section-${categoryId}`} className="faq-section-group">
                <h2 className="faq-section-heading">
                  <span>{group.label}</span>
                  <span className="text-xs font-semibold bg-slate-200 text-slate-600 px-3 py-1 rounded-full">
                    {group.items.length} {group.items.length === 1 ? "question" : "questions"}
                  </span>
                </h2>

                <div className="flex flex-col gap-3">
                  {group.items.map((faq) => {
                    const isOpen = openAccordionIds.includes(faq.id);
                    return (
                      <div key={faq.id} className={`faq-accordion-card ${isOpen ? "open" : ""}`}>
                        <button
                          onClick={() => toggleAccordion(faq.id)}
                          className="faq-accordion-header"
                          aria-expanded={isOpen}
                        >
                          <span className="faq-question-label">{faq.question}</span>
                          <div className="faq-chevron">
                            <ChevronDown className="w-5 h-5" />
                          </div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                            >
                              <div className="faq-accordion-body">
                                {faq.answer.split('\n').map((line, i) => (
                                  <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </main>
      </div>

      {/* Footer Banner */}
      <div className="faq-footer-banner">
        <div>
          <h3 className="faq-footer-title">Have more questions?</h3>
          <p className="faq-footer-text">Reach out directly to the NSS IIT Patna Core Team for support.</p>
        </div>
        <a href="mailto:nss@iitp.ac.in" className="faq-contact-btn">
          <Mail className="w-4 h-4" /> Contact Us
        </a>
      </div>
    </div>
  );
}
