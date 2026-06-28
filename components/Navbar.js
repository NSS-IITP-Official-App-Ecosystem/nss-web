"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa';

export default function Navbar() {
  const [isUnitsOpen, setIsUnitsOpen] = useState(false);
  const [isWingsOpen, setIsWingsOpen] = useState(false); // State for Wings dropdown

  return (
    <nav className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="font-bold text-2xl text-brand-blue">NSS IITP</span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link href="/" className="text-secondary-slate hover:text-brand-blue font-medium transition-colors">
              Home
            </Link>
            
            <Link href="/events" className="text-secondary-slate hover:text-brand-blue font-medium transition-colors">
              Events
            </Link>
            
            <Link href="/our-team" className="text-secondary-slate hover:text-brand-blue font-medium transition-colors">
              Our Team
            </Link>

            <Link href="/faq" className="text-secondary-slate hover:text-brand-blue font-medium transition-colors">
              Contact Us
            </Link>

            {/* Units Dropdown */}
            <div className="relative"
              onMouseEnter={() => setIsUnitsOpen(true)}
              onMouseLeave={() => setIsUnitsOpen(false)}>
              <button
                onClick={() => setIsUnitsOpen(!isUnitsOpen)}
                className="flex items-center gap-1 text-secondary-slate hover:text-brand-blue font-medium transition-colors h-16 cursor-pointer"
                aria-haspopup="true"
              >
                Units <FaChevronDown className={`text-sm transition-transform duration-200 ${isUnitsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isUnitsOpen && (
                <div className="absolute top-16 right-0 w-48 bg-white border border-neutral-foundation rounded-md shadow-lg py-1 z-50">
                  <Link href="/units/unit-1" className="block px-4 py-2 text-sm text-secondary-slate hover:bg-neutral-foundation hover:text-brand-blue transition-colors">
                    Unit 1
                  </Link>
                  <Link href="/units/unit-2" className="block px-4 py-2 text-sm text-secondary-slate hover:bg-neutral-foundation hover:text-brand-blue transition-colors">
                    Unit 2
                  </Link>
                  <Link href="/units/unit-3" className="block px-4 py-2 text-sm text-secondary-slate hover:bg-neutral-foundation hover:text-brand-blue transition-colors">
                    Unit 3
                  </Link>
                </div>
              )}
            </div>

            {/* Wings Dropdown */}
            <div className="relative"
              onMouseEnter={() => setIsWingsOpen(true)}
              onMouseLeave={() => setIsWingsOpen(false)}>
              <button
                onClick={() => setIsWingsOpen(!isWingsOpen)}
                className="flex items-center gap-1 text-secondary-slate hover:text-brand-blue font-medium transition-colors h-16 cursor-pointer"
                aria-haspopup="true"
              >
                Wings <FaChevronDown className={`text-sm transition-transform duration-200 ${isWingsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isWingsOpen && (
                <div className="absolute top-16 right-0 w-56 bg-white border border-neutral-foundation rounded-md shadow-lg py-1 z-50">
                  <Link href="/wings/prayatna" className="block px-4 py-2 text-sm text-secondary-slate hover:bg-neutral-foundation hover:text-brand-blue transition-colors">
                    Prayatna
                  </Link>
                  <Link href="/wings/chetna" className="block px-4 py-2 text-sm text-secondary-slate hover:bg-neutral-foundation hover:text-brand-blue transition-colors">
                    Chetna
                  </Link>
                  <Link href="/wings/rural" className="block px-4 py-2 text-sm text-secondary-slate hover:bg-neutral-foundation hover:text-brand-blue transition-colors">
                    Rural Development
                  </Link>
                  <Link href="/wings/environmental" className="block px-4 py-2 text-sm text-secondary-slate hover:bg-neutral-foundation hover:text-brand-blue transition-colors">
                    Environmental Wing
                  </Link>
                  <Link href="/wings/dnc" className="block px-4 py-2 text-sm text-secondary-slate hover:bg-neutral-foundation hover:text-brand-blue transition-colors">
                    Designer Creation (DNC)
                  </Link>
                  <Link href="/wings/teaching" className="block px-4 py-2 text-sm text-secondary-slate hover:bg-neutral-foundation hover:text-brand-blue transition-colors">
                    Teaching Wing
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}