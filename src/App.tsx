/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutAndProcessSection } from './components/AboutAndProcessSection';
import { ShowcaseSection } from './components/ShowcaseSection';
import { ShowcaseModal } from './components/ShowcaseModal';
import { ContactSection } from './components/ContactSection';
import { SITE_CONFIG, NAV_PAGES, PageId, ShowcaseConcept } from './config/siteConfig';
import { resolveActivePage, getAdjacentPages } from './utils/briefBuilder';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(() =>
    typeof window !== 'undefined' ? resolveActivePage(window.location.hash) : 'overview'
  );
  const [activeConceptModal, setActiveConceptModal] = useState<ShowcaseConcept | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(resolveActivePage(window.location.hash));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setActivePage(page);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${page}`);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  const { previous, next } = getAdjacentPages(activePage);

  return (
    <div className="min-h-screen bg-[#06070A] text-[#F4F5F8] flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#A78BFA] focus:text-[#06070A] focus:font-semibold"
      >
        Chuyển tới nội dung chính
      </a>

      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      <main id="main-content" className="flex-1">
        {activePage === 'overview' && <HeroSection onNavigate={handleNavigate} />}
        {activePage === 'about' && <AboutAndProcessSection onNavigate={handleNavigate} />}
        {activePage === 'capabilities' && <ServicesSection onNavigate={handleNavigate} />}
        {activePage === 'showcase' && (
          <ShowcaseSection onOpenConceptModal={(concept) => setActiveConceptModal(concept)} />
        )}
        {activePage === 'contact' && <ContactSection />}
      </main>

      {/* Clean Previous / Next Section Switcher */}
      <section
        aria-label="Chuyển phần"
        className="border-t border-white/[0.07] bg-[#090B10]"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {previous ? (
            <button
              type="button"
              onClick={() => handleNavigate(previous.id)}
              className="group p-4 rounded-xl bg-[#0B0D13] border border-white/[0.08] hover:border-white/20 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer"
            >
              <div>
                <span className="block text-xs text-[#8E93A6] mb-0.5">Mục trước</span>
                <span className="font-display text-sm sm:text-base font-bold text-[#F4F5F8] group-hover:text-[#A78BFA] transition-colors">
                  {previous.shortTitle}
                </span>
              </div>
              <ArrowLeft className="w-4 h-4 text-[#8E93A6] group-hover:text-[#F4F5F8] shrink-0" aria-hidden="true" />
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {next && (
            <button
              type="button"
              onClick={() => handleNavigate(next.id)}
              className="group p-4 rounded-xl bg-[#0B0D13] border border-white/[0.08] hover:border-white/20 text-left sm:text-right flex items-center justify-between gap-4 transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 text-[#8E93A6] group-hover:text-[#F4F5F8] shrink-0 sm:order-2" aria-hidden="true" />
              <div className="sm:order-1">
                <span className="block text-xs text-[#8E93A6] mb-0.5">Mục tiếp theo</span>
                <span className="font-display text-sm sm:text-base font-bold text-[#F4F5F8] group-hover:text-[#A78BFA] transition-colors">
                  {next.shortTitle}
                </span>
              </div>
            </button>
          )}
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="py-6 bg-[#06070A] border-t border-white/[0.07] text-xs text-[#8E93A6]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-bold text-[#F4F5F8]">
              {SITE_CONFIG.ownerName}
            </span>
            <span aria-hidden="true">·</span>
            <span>{SITE_CONFIG.roleSummary}</span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            {NAV_PAGES.map((page) => (
              <button
                key={page.id}
                type="button"
                onClick={() => handleNavigate(page.id)}
                className={`hover:text-[#F4F5F8] transition-colors cursor-pointer ${
                  activePage === page.id ? 'text-[#F4F5F8] font-medium' : ''
                }`}
              >
                {page.label}
              </button>
            ))}
            <a
              href={SITE_CONFIG.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#F4F5F8] hover:text-[#A78BFA] font-medium transition-colors"
            >
              <span>Facebook</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>

      <ShowcaseModal
        concept={activeConceptModal}
        onClose={() => setActiveConceptModal(null)}
      />
    </div>
  );
}
