import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { SITE_CONFIG, PageId } from '../config/siteConfig';
import { ThreeStudioCanvas, DisplayTheme } from './ThreeStudioCanvas';

interface HeroSectionProps {
  onNavigate: (page: PageId) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [active3DTheme, setActive3DTheme] = useState<DisplayTheme>('web');

  return (
    <div className="space-y-14 md:space-y-20 pb-12">
      {/* Main Hero with Interactive 3D Studio Canvas */}
      <section
        aria-labelledby="hero-heading"
        className="pt-8 pb-12 md:pt-14 md:pb-16 border-b border-white/[0.07]"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Concise, direct human intro */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <p className="text-xs sm:text-sm text-[#A78BFA] font-medium mb-3">
                  {SITE_CONFIG.hero.kicker}
                </p>

                <h1
                  id="hero-heading"
                  className="font-display text-[clamp(2rem,3.6vw,3.25rem)] font-bold tracking-tight text-[#F4F5F8] leading-[1.15] mb-4 [text-wrap:balance]"
                >
                  {SITE_CONFIG.hero.headline}
                </h1>

                <p className="text-base text-[#A2A7B8] leading-[1.7] max-w-[54ch]">
                  {SITE_CONFIG.hero.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={SITE_CONFIG.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#06070A] bg-[#F4F5F8] hover:bg-[#A78BFA] rounded-lg transition-colors min-h-[44px] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A78BFA]"
                >
                  <span>{SITE_CONFIG.hero.primaryCta}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() => onNavigate('capabilities')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-[#F4F5F8] bg-[#0E1118] hover:bg-[#161B26] border border-white/10 rounded-lg transition-colors min-h-[44px] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A78BFA]"
                >
                  <span>{SITE_CONFIG.hero.secondaryCta}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('showcase')}
                  className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-[#8E93A6] hover:text-[#F4F5F8] transition-colors min-h-[44px] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {SITE_CONFIG.hero.tertiaryCta}
                </button>
              </div>
            </div>

            {/* Right Column: Optimized Three.js 3D Interactive Studio Sculpture */}
            <div className="lg:col-span-6">
              <ThreeStudioCanvas
                activeTheme={active3DTheme}
                onThemeChange={setActive3DTheme}
              />
            </div>
          </div>

          {/* 3 Short Principles Below Hero */}
          <div className="mt-10 pt-8 border-t border-white/[0.07] grid grid-cols-1 md:grid-cols-3 gap-6">
            {SITE_CONFIG.hero.honestCommitments.map((item) => (
              <div key={item.label} className="space-y-1">
                <p className="text-xs font-medium text-[#A78BFA]">{item.label}</p>
                <p className="text-sm text-[#F4F5F8]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Section Cards */}
      <section aria-labelledby="directory-heading" className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <h2
            id="directory-heading"
            className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#F4F5F8]"
          >
            Các mục chính trên trang
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SITE_CONFIG.overviewPillars.map((pillar) => (
            <button
              key={pillar.id}
              type="button"
              onClick={() => onNavigate(pillar.targetPage)}
              className="group text-left rounded-xl bg-[#0B0D13] border border-white/[0.08] hover:border-white/20 p-5 flex flex-col justify-between transition-colors cursor-pointer"
            >
              <div>
                <span className="font-mono text-xs text-[#A78BFA] font-semibold tabular-nums block mb-2">
                  {pillar.number}
                </span>
                <h3 className="font-display text-base font-bold text-[#F4F5F8] mb-1.5 group-hover:text-[#A78BFA] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#A2A7B8] leading-relaxed mb-4">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-[#F4F5F8]">
                <span>{pillar.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
