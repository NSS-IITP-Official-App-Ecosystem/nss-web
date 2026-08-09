"use client";

import { useState, useMemo, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { resolveImageUrl } from '@/utils/imageUrl';
import {
  FaEnvelope,
  FaLinkedinIn,
  FaCircleInfo
} from 'react-icons/fa6';
import '../our-team/our-team.css';

export default function AdvisoryTeam() {
  const [selectedYear, setSelectedYear] = useState('2026-27');
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [dbMembers, setDbMembers] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

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

  // Categorize advisory team members based on selected year for hierarchy layout
  const { director, adeanUg, registrar, adeanSa, pic, pos, gensecs, otherMembers } = useMemo(() => {
    if (!dbMembers) return { pos: [], gensecs: [], otherMembers: [] };
    
    // Get all active members for this year (Admins, Advisory, and Secretaries but NOT deputies)
    const activeMembers = dbMembers
      .filter(m => {
        if (m.academic_year !== selectedYear) return false;
        const isSecretary = m.category === 'secretary' || m.role.toLowerCase().includes('general secretary');
        const isDeputy = m.role.toLowerCase().includes('deputy');
        if (isSecretary && isDeputy) return false; // Block deputy secretaries
        return m.category === 'admin' || m.category === 'advisory' || isSecretary;
      })
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    
    // Categorize by role matching
    const director = activeMembers.find(m => m.role.toLowerCase().includes('director'));
    const adeanUg = activeMembers.find(m => m.role.toLowerCase().includes('dean') && m.role.toLowerCase().includes('ug'));
    const registrar = activeMembers.find(m => m.role.toLowerCase().includes('registrar'));
    const adeanSa = activeMembers.find(m => m.role.toLowerCase().includes('dean') && m.role.toLowerCase().includes('sa'));
    const pic = activeMembers.find(m => m.role.toLowerCase().includes('pic') || m.role.toLowerCase().includes('professor in charge') || m.role.toLowerCase().includes('program coordinator'));
    const pos = activeMembers.filter(m => m.role.toLowerCase().includes('po') || m.role.toLowerCase().includes('program officer') || m.role.toLowerCase().includes('programme officer'));
    // Filter General Secretaries and explicitly deduplicate by name to prevent DB duplicate row issues
    const rawGensecs = activeMembers.filter(m => 
      (m.role.toLowerCase().includes('general secretary') || m.role.toLowerCase().includes('gensec')) && 
      !m.role.toLowerCase().includes('deputy')
    );
    const gensecs = [];
    const seenNames = new Set();
    rawGensecs.forEach(m => {
      // Prioritize the row that actually has an image if duplicates exist
      if (!seenNames.has(m.name)) {
        const duplicates = rawGensecs.filter(dup => dup.name === m.name);
        const bestRecord = duplicates.find(dup => dup.image_url) || m;
        gensecs.push(bestRecord);
        seenNames.add(m.name);
      }
    });
    
    // Any remaining members that didn't match the specific slots above
    const otherMembers = activeMembers.filter(m => 
      m !== director && m !== adeanUg && m !== registrar && m !== adeanSa && m !== pic && !pos.includes(m) && !rawGensecs.includes(m)
    ).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

    return { director, adeanUg, registrar, adeanSa, pic, pos, gensecs, otherMembers };
  }, [selectedYear, dbMembers]);

  return (
    <>
      {/* India tricolor top bar (navbar breaker line) */}
      <div style={{ height: 4, width: '100%', background: 'linear-gradient(90deg, #FF9933 0%, #ffffff 50%, #138808 100%)' }} />
      <div className="team-page-container">
        {/* Dynamic Ambient Blur Circles */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          <div className="bg-blur-circle bg-blur-1"></div>
          <div className="bg-blur-circle bg-blur-2"></div>
        </div>

        {/* Top Header Row: Title & Year Selector Dropdown */}
        <div className="team-header-row">
          <motion.section
            className="intro-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="page-title">Advisory Team</h1>

            <p className="intro-text mt-4 text-slate-500 max-w-3xl">
              Meet the guiding pillars of NSS IIT Patna. Our advisory team provides strategic direction, support, and oversight to ensure our initiatives create a meaningful and lasting impact.
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
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Unified Advisory Committee Members Grid / Hierarchy */}
        <section className="hierarchy-section" style={{ marginTop: '0px', alignItems: 'center', width: '100%', maxWidth: '1200px', padding: '0' }}>
          {dbMembers ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%', alignItems: 'center' }}>
              
              {/* Director */}
              {director && (
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '240px', margin: '0 auto' }}>
                  <TeamCard member={director} index={0} onQuickView={setSelectedMember} />
                </div>
              )}

              {/* Associate Dean Academics, UG & Registrar */}
              {(adeanUg || registrar) && (
                <div className="team-grid">
                  {adeanUg && <TeamCard member={adeanUg} index={1} onQuickView={setSelectedMember} />}
                  {registrar && <TeamCard member={registrar} index={2} onQuickView={setSelectedMember} />}
                </div>
              )}

              {/* A.Dean SA */}
              {adeanSa && (
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '240px', margin: '0 auto' }}>
                  <TeamCard member={adeanSa} index={3} onQuickView={setSelectedMember} />
                </div>
              )}

              {/* PIC and POs */}
              {(pic || pos.length > 0) && (
                <div className="team-grid">
                  {pic && <TeamCard member={pic} index={4} onQuickView={setSelectedMember} />}
                  {pos.map((po, i) => (
                    <TeamCard key={po.id} member={po} index={i+5} onQuickView={setSelectedMember} />
                  ))}
                </div>
              )}

              {/* Any Other Advisory Members */}
              {otherMembers.length > 0 && (
                <div className="team-grid">
                  {otherMembers.map((m, i) => (
                    <TeamCard key={m.id} member={m} index={i+15} onQuickView={setSelectedMember} />
                  ))}
                </div>
              )}

              {/* General Secretaries */}
              {gensecs.length > 0 && (
                <div className="team-grid">
                  {gensecs.map((gs, i) => (
                    <TeamCard key={gs.id} member={gs} index={i+20} onQuickView={setSelectedMember} />
                  ))}
                </div>
              )}

              {!director && !adeanUg && !registrar && !adeanSa && !pic && pos.length === 0 && gensecs.length === 0 && otherMembers.length === 0 && (
                <div className="text-center py-12 text-slate-500 w-full">
                  <p>No advisory team members found for the selected year.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 w-full">
              <p>Loading advisory team members...</p>
            </div>
          )}
        </section>


      </div>
    </>
  );
}

// Sub-component: Individual Advisory Team Member Card
function TeamCard({ member, index, onQuickView }) {
  const cardBorderClass = member.category === 'admin' ? 'card-secretary' : 'card-core';

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
          src={member.image_url || "/testimonial/person-1.jpg"}
          alt={member.name}
          className="member-img"
        />

      </div>
      <div className="card-info">
        <h3 className="member-name">{member.name}</h3>
        <p className="member-role">{member.role?.replace(/Program Officer/gi, 'Programme Officer').replace(/(?:Academic|A\.?)\s*Dean\s*UG/gi, 'Associate Dean Academics, UG')}</p>

      </div>
    </motion.div>
  );
}
