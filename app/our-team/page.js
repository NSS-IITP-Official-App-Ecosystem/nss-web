"use client";

import { useState, useMemo, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { resolveImageUrl } from '@/utils/imageUrl';
import {
  FaEnvelope,
  FaLinkedinIn,
  FaMagnifyingGlass,
  FaCircleInfo
} from 'react-icons/fa6';
import './our-team.css';

export default function OurTeam() {
  const [selectedYear, setSelectedYear] = useState('2026-27');
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);
  const [dbMembers, setDbMembers] = useState(null);

  useEffect(() => {
    const fetchTeamFromDb = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .order('sort_order', { ascending: true });

        if (!error && data && data.length > 0) {
          setDbMembers(data);
        }
      } catch (err) {
        console.error("Failed to fetch team members from database:", err);
      }
    };
    fetchTeamFromDb();
  }, []);

  // Handle click outside to close custom year dropdown
  useEffect(() => {
    if (!isYearOpen) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest('.custom-dropdown-container')) {
        setIsYearOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isYearOpen]);

  // Get active administrative leadership tree based on selected year
  const activeLeadershipTree = useMemo(() => {
    if (!dbMembers) return [];
    return dbMembers
      .filter(m => m.category === 'admin' && m.academic_year === selectedYear)
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
      .map(m => ({
        id: m.id,
        name: m.name,
        role: m.role,
        detailedRole: m.role,
        image: m.image_url,
        email: m.email,
        bio: m.bio,
        category: m.category,
        linkedin: m.linkedin_url || "https://linkedin.com",
        github: m.github_url || "https://github.com"
      }));
  }, [selectedYear, dbMembers]);

  // Get active student core team based on selected year
  const activeTeamMembers = useMemo(() => {
    if (!dbMembers) return [];
    return dbMembers
      .filter(m => m.category !== 'admin' && m.academic_year === selectedYear)
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
      .map(m => {
        let displayRole = m.role || "";
        if (displayRole.toLowerCase().includes('sub coordinator') || displayRole.toLowerCase().includes('sub-coordinator')) {
          displayRole = displayRole.replace(/sub[- ]coordinator/i, 'Mentor');
        }
        return {
          id: m.id,
          name: m.name,
          role: displayRole,
          detailedRole: displayRole,
          image: m.image_url,
          email: m.email,
          bio: m.bio,
          category: m.category,
          linkedin: m.linkedin_url || "https://linkedin.com",
          github: m.github_url || "https://github.com"
        };
      });
  }, [selectedYear, dbMembers]);

  const activeGenSecs = useMemo(() => {
    return activeTeamMembers.filter(m => 
      m.category === 'secretary' && 
      !m.role.toLowerCase().includes('deputy')
    );
  }, [activeTeamMembers]);

  const activeDeputyGenSecs = useMemo(() => {
    return activeTeamMembers.filter(m => 
      m.category === 'secretary' && 
      m.role.toLowerCase().includes('deputy')
    );
  }, [activeTeamMembers]);

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
  const gensecMembers = useMemo(() => filteredMembers.filter(m => m.category === 'secretary' && !m.role.toLowerCase().includes('deputy')), [filteredMembers]);
  const deputyGensecMembers = useMemo(() => filteredMembers.filter(m => m.category === 'secretary' && m.role.toLowerCase().includes('deputy')), [filteredMembers]);
  const coreMembers = useMemo(() => filteredMembers.filter(m => m.category === 'core'), [filteredMembers]);
  const pgMembers = useMemo(() => filteredMembers.filter(m => m.category === 'pg'), [filteredMembers]);
  const mentorMembers = useMemo(() => filteredMembers.filter(m => m.category === 'mentor'), [filteredMembers]);
  const webMembers = useMemo(() => filteredMembers.filter(m => m.category === 'web'), [filteredMembers]);

  // Group mentors by wing
  const mentorWings = useMemo(() => {
    const wingsMap = {
      "Teaching & Tech Wing": [],
      "Environmental Wing": [],
      "Prayatna Wing": [],
      "Prerna Wing": [],
      "Rural Development Wing": [],
      "Chetna Wing": [],
      "Logistics Wing": [],
      "Nukkad Wing": [],
      "DNC Wing": [],
      "Other Mentors": []
    };

    mentorMembers.forEach(m => {
      const roleStr = (m.detailedRole || m.role || "").toLowerCase();
      if (roleStr.includes("teaching") || roleStr.includes("tech")) {
        wingsMap["Teaching & Tech Wing"].push(m);
      } else if (roleStr.includes("environ")) {
        wingsMap["Environmental Wing"].push(m);
      } else if (roleStr.includes("prayatna")) {
        wingsMap["Prayatna Wing"].push(m);
      } else if (roleStr.includes("prerna")) {
        wingsMap["Prerna Wing"].push(m);
      } else if (roleStr.includes("rural")) {
        wingsMap["Rural Development Wing"].push(m);
      } else if (roleStr.includes("chetna")) {
        wingsMap["Chetna Wing"].push(m);
      } else if (roleStr.includes("logistic")) {
        wingsMap["Logistics Wing"].push(m);
      } else if (roleStr.includes("nukkad")) {
        wingsMap["Nukkad Wing"].push(m);
      } else if (roleStr.includes("dnc")) {
        wingsMap["DNC Wing"].push(m);
      } else {
        wingsMap["Other Mentors"].push(m);
      }
    });

    return Object.entries(wingsMap).filter(([_, members]) => members.length > 0);
  }, [mentorMembers]);

  if (dbMembers === null) {
    return (
      <>
        {/* India tricolor top bar (navbar breaker line) */}
        <div style={{ height: 4, width: '100%', background: 'linear-gradient(90deg, #FF9933 0%, #ffffff 50%, #138808 100%)' }} />
        <div className="team-page-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", border: "3px solid #e2e8f0", borderTopColor: "var(--primary)", animation: "spin 1s linear infinite" }}></div>
            <p style={{ color: "var(--text-muted)", fontWeight: "500" }}>Loading NSS Team Roster...</p>
          </div>
          <style jsx global>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </>
    );
  }

  return (
    <>
      {/* India tricolor top bar (navbar breaker line) */}
      <div style={{ height: 4, width: '100%', background: 'linear-gradient(90deg, #FF9933 0%, #ffffff 50%, #138808 100%)' }} />
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

        <div className="year-selector-container">
          <span className="year-label">Academic Year</span>
          <div className="custom-dropdown-container">
            <button
              className={`custom-dropdown-trigger ${isYearOpen ? 'active' : ''}`}
              onClick={() => setIsYearOpen(!isYearOpen)}
              aria-haspopup="listbox"
              aria-expanded={isYearOpen}
            >
              <span>{selectedYear}</span>
              <span className={`dropdown-arrow-icon ${isYearOpen ? 'open' : ''}`}></span>
            </button>
            
            <AnimatePresence>
              {isYearOpen && (
                <motion.ul
                  className="custom-dropdown-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  role="listbox"
                >
                  <li
                    className={`custom-dropdown-item ${selectedYear === '2026-27' ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedYear('2026-27');
                      setIsYearOpen(false);
                    }}
                    role="option"
                    aria-selected={selectedYear === '2026-27'}
                  >
                    2026-27
                  </li>
                  <li
                    className={`custom-dropdown-item ${selectedYear === '2025-26' ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedYear('2025-26');
                      setIsYearOpen(false);
                    }}
                    role="option"
                    aria-selected={selectedYear === '2025-26'}
                  >
                    2025-26
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
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
            <div className="tree-node node-highlight" onClick={() => activeLeadershipTree[0] && setSelectedMember(activeLeadershipTree[0])}>
              <div className="node-avatar-wrapper">
                <img src={activeLeadershipTree[0]?.image || "/placeholder.svg"} alt={activeLeadershipTree[0]?.name || "Director"} className="node-avatar" />
              </div>
              <span className="node-role-tag">Director</span>
              <h4 className="node-admin-name">{activeLeadershipTree[0]?.name || "To Be Decided"}</h4>
            </div>
          </motion.div>

          <div className="tree-line-v"></div>

          {/* Tier 2: Academic Dean UG */}
          <motion.div
            className="tree-tier"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="tree-node node-highlight" onClick={() => activeLeadershipTree[1] && setSelectedMember(activeLeadershipTree[1])}>
              <div className="node-avatar-wrapper">
                <img src={activeLeadershipTree[1]?.image || "/placeholder.svg"} alt={activeLeadershipTree[1]?.name || "Academic Dean UG"} className="node-avatar" />
              </div>
              <span className="node-role-tag">Academic Dean UG</span>
              <h4 className="node-admin-name">{activeLeadershipTree[1]?.name || "To Be Decided"}</h4>
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
                <div className="tree-node" onClick={() => activeLeadershipTree[2] && setSelectedMember(activeLeadershipTree[2])}>
                  <div className="node-avatar-wrapper">
                    <img src={activeLeadershipTree[2]?.image || "/placeholder.svg"} alt={activeLeadershipTree[2]?.name || "Professor in Charge"} className="node-avatar" />
                  </div>
                  <span className="node-role-tag">Professor in Charge</span>
                  <h4 className="node-admin-name">{activeLeadershipTree[2]?.name || "To Be Decided"}</h4>
                </div>
              </div>
              {/* Security Officer */}
              <div className="tree-branch-col">
                <div className="tree-node" onClick={() => activeLeadershipTree[3] && setSelectedMember(activeLeadershipTree[3])}>
                  <div className="node-avatar-wrapper">
                    <img src={activeLeadershipTree[3]?.image || "/placeholder.svg"} alt={activeLeadershipTree[3]?.name || "Security Officer"} className="node-avatar" />
                  </div>
                  <span className="node-role-tag">Security Officer</span>
                  <h4 className="node-admin-name">{activeLeadershipTree[3]?.name || "To Be Decided"}</h4>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="tree-line-v"></div>

          {/* Tier 4: General Secretaries Branch */}
          <motion.div
            className="tree-branch-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="tree-branch-row">
              {/* General Secretary 1 */}
              <div className="tree-branch-col">
                <div className="tree-node" onClick={() => activeGenSecs[0] && setSelectedMember(activeGenSecs[0])}>
                  <div className="node-avatar-wrapper">
                    <img src={activeGenSecs[0]?.image || "/placeholder.svg"} alt="General Secretary" className="node-avatar" />
                  </div>
                  <span className="node-role-tag">General Secretary</span>
                  <h4 className="node-admin-name">{activeGenSecs[0]?.name || "To Be Decided"}</h4>
                </div>
              </div>
              {/* General Secretary 2 */}
              {selectedYear === '2025-26' && <div className="tree-branch-col">
                <div className="tree-node" onClick={() => activeGenSecs[1] && setSelectedMember(activeGenSecs[1])}>
                  <div className="node-avatar-wrapper">
                    <img src={activeGenSecs[1]?.image || "/placeholder.svg"} alt="General Secretary" className="node-avatar" />
                  </div>
                  <span className="node-role-tag">General Secretary</span>
                  <h4 className="node-admin-name">{activeGenSecs[1]?.name || "To Be Decided"}</h4>
                </div>
              </div>}
            </div>
          </motion.div>

          {selectedYear !== '2025-26' && (
            <>
              <div className="tree-line-v"></div>

              {/* Tier 5: Deputy General Secretaries Branch */}
              <motion.div
                className="tree-branch-container"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="tree-branch-row">
                  {/* Deputy General Secretary 1 */}
                  <div className="tree-branch-col">
                    <div className="tree-node" onClick={() => activeDeputyGenSecs[0] && setSelectedMember(activeDeputyGenSecs[0])}>
                      <div className="node-avatar-wrapper">
                        <img src={activeDeputyGenSecs[0]?.image || "/placeholder.svg"} alt="Deputy General Secretary" className="node-avatar" />
                      </div>
                      <span className="node-role-tag">Deputy General Secretary</span>
                      <h4 className="node-admin-name">{activeDeputyGenSecs[0]?.name || "To Be Decided"}</h4>
                    </div>
                  </div>
                  {/* Deputy General Secretary 2 */}
                  <div className="tree-branch-col">
                    <div className="tree-node" onClick={() => activeDeputyGenSecs[1] && setSelectedMember(activeDeputyGenSecs[1])}>
                      <div className="node-avatar-wrapper">
                        <img src={activeDeputyGenSecs[1]?.image || "/placeholder.svg"} alt="Deputy General Secretary" className="node-avatar" />
                      </div>
                      <span className="node-role-tag">Deputy General Secretary</span>
                      <h4 className="node-admin-name">{activeDeputyGenSecs[1]?.name || "To Be Decided"}</h4>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}

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
              General Secretaries
            </button>
            <button
              className={`filter-tab ${activeFilter === 'core' ? 'active' : ''}`}
              onClick={() => setActiveFilter('core')}
            >
              Secretaries
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
        {gensecMembers.length > 0 && (
          <motion.div
            className="team-category-group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="category-header">
              <h2 className="category-title text-2xl font-bold">General Secretaries</h2>
              <span className="category-count">{gensecMembers.length} member{gensecMembers.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="team-grid">
              {gensecMembers.map((member, i) => (
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

        {/* Deputy General Secretary Group */}
        {deputyGensecMembers.length > 0 && (
          <motion.div
            className="team-category-group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div className="category-header">
              <h2 className="category-title text-2xl font-bold">Deputy General Secretary</h2>
              <span className="category-count">{deputyGensecMembers.length} member{deputyGensecMembers.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="team-grid">
              {deputyGensecMembers.map((member, i) => (
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
              <h2 className="category-title text-2xl font-bold">Secretaries</h2>
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

        {/* Mentors Grouped by Wing */}
        {mentorWings.map(([wingName, members], groupIndex) => (
          <motion.div
            key={wingName}
            className="team-category-group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + groupIndex * 0.05 }}
          >
            <div className="category-header">
              <h2 className="category-title text-2xl font-bold">Mentors - {wingName}</h2>
              <span className="category-count">{members.length} member{members.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="team-grid">
              {members.map((member, i) => (
                <TeamCard
                  key={member.id}
                  member={member}
                  index={i}
                  onQuickView={setSelectedMember}
                />
              ))}
            </div>
          </motion.div>
        ))}

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
                    src={resolveImageUrl(selectedMember.image, "/testimonial/person-1.jpg")}
                    alt={selectedMember.name}
                    className="modal-profile-img"
                  />
                </div>
                <div className="modal-profile-content">
                  <h3 className="modal-name">{selectedMember.name}</h3>
                  <p className="modal-role">{selectedMember.detailedRole}</p>
                  <hr className="modal-divider" />
                  <p className="modal-section-title">Biography / Roles</p>
                  <p className="modal-bio">{selectedMember.bio}</p>
                  {!(selectedMember.category === 'admin' || (selectedMember.category === 'secretary' && !selectedMember.role.toLowerCase().includes('deputy'))) && (
                    <div className="modal-contact-section">
                      <p className="modal-section-title">Connect & Contact</p>
                      <div className="modal-contact-row">
                        {selectedMember.email && (
                          <a href={`mailto:${selectedMember.email}`} className="btn-modal-contact">
                            <FaEnvelope /> Email
                          </a>
                        )}
                        {selectedMember.linkedin && (
                          <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="btn-modal-contact secondary">
                            <FaLinkedinIn /> LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
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
          src={resolveImageUrl(member.image, "/testimonial/person-1.jpg")}
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
        {!(member.category === 'admin' || (member.category === 'secretary' && !member.role.toLowerCase().includes('deputy'))) && (
          <div className="member-socials">
            {member.email && (
              <a href={`mailto:${member.email}`} className="social-link" title="Email">
                <FaEnvelope />
              </a>
            )}
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                <FaLinkedinIn />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}