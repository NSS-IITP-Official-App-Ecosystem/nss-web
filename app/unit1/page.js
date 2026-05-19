import React from 'react';
import Link from 'next/link';

export default function Unit1() {
  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">NSS Unit 1</h1>
          <p className="page-subtitle">Dedicated to education, design, and inspiring the minds of tomorrow.</p>
        </div>
      </div>

      <div className="container py-xl">
        <div className="unit-description card mb-4">
          <h2 className="section-title text-center mb-3">About Unit 1</h2>
          <p className="text-center text-secondary max-w-3xl mx-auto">
            Welcome to Unit 1 of NSS IIT Patna. Our unit is a vibrant community of volunteers 
            committed to bringing positive change through education and creative design. We 
            believe in empowering individuals by sharing knowledge and utilizing design 
            thinking to solve real-world problems.
          </p>
        </div>

        <div className="quotes-section mb-5">
          <div className="quote-card quote-card-1">
            <div className="text-icon text-icon-1">❝</div>
            <blockquote>
              "Education is the most powerful weapon which you can use to change the world."
            </blockquote>
            <cite>- Nelson Mandela</cite>
          </div>
          <div className="quote-card quote-card-2">
            <div className="text-icon text-icon-2">❝</div>
            <blockquote>
              "Design is not just what it looks like and feels like. Design is how it works."
            </blockquote>
            <cite>- Steve Jobs</cite>
          </div>
        </div>

        <h2 className="section-title text-center mb-4">Our Wings</h2>
        <div className="grid-2">
          <Link href="/wings/teaching" className="card wing-card teaching-card">
            <div className="wing-icon teaching-icon">
              <span style={{ fontSize: '2.2rem' }}>📚</span>
            </div>
            <h3>Teaching Wing</h3>
            <p>
              Dedicated to providing quality education to underprivileged children. We conduct 
              regular classes, mentoring sessions, and interactive workshops to foster a love 
              for learning.
            </p>
            <div className="text-btn text-btn-teaching mt-auto">
              Explore Teaching Wing <span className="arrow">→</span>
            </div>
          </Link>

          <Link href="/wings/design" className="card wing-card design-card">
            <div className="wing-icon design-icon">
              <span style={{ fontSize: '2.2rem' }}>🎨</span>
            </div>
            <h3>Design Wing</h3>
            <p>
              The creative powerhouse of our unit. We handle the visual identity, campaign 
              posters, social media graphics, and creative strategies to maximize the reach 
              of NSS initiatives.
            </p>
            <div className="text-btn text-btn-design mt-auto">
              Explore Design Wing <span className="arrow">→</span>
            </div>
          </Link>
        </div>
      </div>

      <style>{`
        /* COLOR PALETTE VARIABLES */
        :root {
          --deep-blue: #1e3a8a;       /* Dark, authoritative blue */
          --gold-accent: #d4af37;     /* Elegant gold */
          --secondary-slate: #64748b; /* Readable grayish-blue for text */
          --neutral-foundation: #f8fafc; /* Very light slate for page background */
          --success-emerald: #10b981; 
          --warming-amber: #f59e0b;   /* Warm orange/yellow */
          --error-crimson: #e11d48;
          --info-azure: #0ea5e9;      /* Bright, communicative blue */
          --pure-white: #ffffff;
        }

        /* General Setup */
        .page-container { 
          padding-top: 40px; 
          font-family: system-ui, -apple-system, sans-serif;
          background-color: var(--neutral-foundation);
          min-height: 100vh;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* Header Styling */
        .page-header {
          background: linear-gradient(135deg, var(--deep-blue) 0%, #0f172a 100%);
          padding: 6rem 0 4rem;
          text-align: center;
          border-radius: 0 0 40px 40px;
          margin-bottom: 3rem;
          box-shadow: 0 10px 30px rgba(30, 58, 138, 0.2);
          border-bottom: 3px solid var(--gold-accent);
        }
        .page-title {
          font-size: 3.5rem; 
          color: var(--pure-white); 
          margin-bottom: 1rem;
          font-weight: 800;
          letter-spacing: -1px;
        }
        .page-subtitle {
          font-size: 1.25rem; 
          color: #cbd5e1; /* Lighter slate for contrast against deep blue */
          max-width: 600px; 
          margin: 0 auto;
          font-weight: 500;
        }

        /* Utilities */
        .py-xl { padding-bottom: 5rem; }
        .mb-4 { margin-bottom: 2rem; }
        .mb-5 { margin-bottom: 4rem; }
        .mb-3 { margin-bottom: 1.5rem; }
        .text-center { text-align: center; }
        .max-w-3xl { max-width: 48rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        
        .section-title {
          font-size: 2rem;
          color: var(--deep-blue);
          font-weight: 700;
        }
        .text-secondary {
          color: var(--secondary-slate);
          line-height: 1.7;
          font-size: 1.1rem;
        }

        /* Description Card */
        .unit-description {
          padding: 3rem 2.5rem;
          background: var(--pure-white);
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.03);
        }
        
        /* Quotes Section */
        .quotes-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .quote-card {
          padding: 2.5rem;
          border-radius: 0 20px 20px 0;
          position: relative;
          background: var(--pure-white);
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          overflow: hidden;
        }
        /* First quote uses Info Azure */
        .quote-card-1 { border-left: 5px solid var(--info-azure); }
        /* Second quote uses Warming Amber */
        .quote-card-2 { border-left: 5px solid var(--warming-amber); }

        .text-icon {
          position: absolute;
          top: -0.5rem; 
          right: 1.5rem;
          font-size: 5rem;
          opacity: 0.1;
          font-family: serif;
          line-height: 1;
        }
        .text-icon-1 { color: var(--info-azure); }
        .text-icon-2 { color: var(--warming-amber); }

        .quote-card blockquote {
          font-size: 1.2rem;
          font-style: italic;
          color: var(--deep-blue);
          margin: 0 0 1.5rem 0;
          line-height: 1.7;
          font-weight: 500;
          position: relative;
          z-index: 2;
        }
        .quote-card cite {
          font-size: 1rem;
          font-weight: 700;
        }
        .quote-card-1 cite { color: var(--info-azure); }
        .quote-card-2 cite { color: var(--warming-amber); }

        /* Wing Cards */
        .grid-2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }
        .wing-card {
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          background: var(--pure-white);
          border-radius: 24px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.03);
          position: relative;
          overflow: hidden;
        }
        
        .wing-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; height: 4px;
        }
        /* Teaching Wing gets Info Azure accent */
        .teaching-card::before { background: var(--info-azure); }
        /* Design Wing gets Gold Accent */
        .design-card::before { background: var(--gold-accent); }

        .wing-card:hover { 
          transform: translateY(-8px); 
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04); 
        }
        
        .wing-icon {
          width: 75px; height: 75px;
          border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 2rem;
          transition: transform 0.3s ease;
        }
        .wing-card:hover .wing-icon {
          transform: scale(1.1);
        }

        /* Subtle background tints for icons based on their accent color */
        .teaching-icon { background: rgba(14, 165, 233, 0.1); }
        .design-icon { background: rgba(212, 175, 55, 0.15); }

        .wing-card h3 {
          font-size: 1.75rem; 
          margin: 0 0 1rem 0; 
          color: var(--deep-blue);
          font-weight: 700;
        }
        .wing-card p {
          color: var(--secondary-slate); 
          flex: 1; 
          margin: 0 0 2rem 0; 
          line-height: 1.7;
          font-size: 1.05rem;
        }

        .text-btn {
          font-weight: 700; 
          display: inline-flex; 
          align-items: center; 
          gap: 0.5rem; 
          transition: all 0.2s ease;
          font-size: 1.05rem;
        }
        .text-btn-teaching { color: var(--info-azure); }
        .text-btn-design { color: var(--gold-accent); }
        
        .arrow {
          font-size: 1.2rem;
          transition: transform 0.2s ease;
        }
        .wing-card:hover .arrow {
          transform: translateX(4px);
        }
        
        .mt-auto { margin-top: auto; }

        /* Animation */
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
