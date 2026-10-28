import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG, NAV_PAGES, PageId } from '../config/siteConfig';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleSelectPage = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#06070A]/90 backdrop-blur-xl border-b border-white/[0.07]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => handleSelectPage('overview')}
          className="font-display text-lg font-bold tracking-tight text-[#F4F5F8] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A78BFA]"
        >
          {SITE_CONFIG.brandMark}
        </button>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Điều hướng các phần"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_PAGES.map((page) => {
            const isActive = activePage === page.id;
            return (
              <button
                key={page.id}
                type="button"
                onClick={() => handleSelectPage(page.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-5 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A78BFA] ${
                  isActive
                    ? 'text-[#F4F5F8] font-semibold'
                    : 'text-[#8E93A6] hover:text-[#F4F5F8]'
                }`}
              >
                <span>{page.label}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A78BFA]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={SITE_CONFIG.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-[#06070A] bg-[#F4F5F8] hover:bg-[#A78BFA] rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A78BFA]"
          >
            <span>Kết nối Facebook</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={mobileMenuOpen ? 'Đóng danh mục trang' : 'Mở danh mục trang'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/10 text-[#F4F5F8] hover:bg-white/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A78BFA]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-panel"
          aria-label="Danh mục trang trên di động"
          className="md:hidden border-b border-white/10 bg-[#0B0D13] px-4 py-4"
        >
          <ul className="flex flex-col space-y-1">
            {NAV_PAGES.map((page, idx) => {
              const isActive = activePage === page.id;
              return (
                <li key={page.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectPage(page.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                      isActive
                        ? 'bg-[#141824] text-[#F4F5F8] font-semibold border border-white/10'
                        : 'text-[#8E93A6] hover:text-[#F4F5F8] hover:bg-white/[0.03]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="font-mono text-xs text-[#A78BFA] tabular-nums">
                        0{idx + 1}.
                      </span>
                      <span>{page.shortTitle}</span>
                    </span>
                    <span className="text-xs text-[#8E93A6]">
                      {isActive ? 'Đang xem' : 'Mở phần này'}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
};
