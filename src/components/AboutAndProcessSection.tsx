import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG, PageId } from '../config/siteConfig';

interface AboutAndProcessSectionProps {
  onNavigate: (page: PageId) => void;
}

export const AboutAndProcessSection: React.FC<AboutAndProcessSectionProps> = ({ onNavigate }) => {
  return (
    <div className="py-10 md:py-16 space-y-14 md:space-y-20">
      {/* Page Header & Profile Story */}
      <section aria-labelledby="about-heading" className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="pb-8 mb-8 border-b border-white/[0.07]">
          <p className="text-xs text-[#A78BFA] font-medium mb-2">
            {SITE_CONFIG.about.kicker}
          </p>
          <h1
            id="about-heading"
            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F4F5F8] max-w-3xl [text-wrap:balance]"
          >
            {SITE_CONFIG.about.headline}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left column: concise bio */}
          <div className="lg:col-span-6 space-y-4">
            <div className="space-y-3 text-sm sm:text-base text-[#A2A7B8] leading-[1.75]">
              {SITE_CONFIG.about.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('capabilities')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#06070A] bg-[#F4F5F8] hover:bg-[#A78BFA] rounded-lg transition-colors min-h-[42px] cursor-pointer"
              >
                <span>Xem Dịch vụ</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href={SITE_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#8E93A6] hover:text-[#F4F5F8] transition-colors min-h-[42px]"
              >
                <span>Facebook cá nhân</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right column: 4 core principles */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-[#0B0D13] border border-white/[0.08] p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {SITE_CONFIG.about.workingPrinciples.map((item, idx) => (
                  <div key={item.title} className="space-y-1.5">
                    <span className="font-mono text-xs text-[#38BDF8] tabular-nums block">
                      0{idx + 1}.
                    </span>
                    <h2 className="font-display text-base font-bold text-[#F4F5F8]">
                      {item.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#A2A7B8] leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quy Trình 4 Bước */}
      <section aria-labelledby="process-heading" className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <p className="text-xs text-[#38BDF8] font-medium mb-1">
            Quy trình làm việc
          </p>
          <h2
            id="process-heading"
            className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#F4F5F8]"
          >
            4 bước gọn gàng từ lúc nhắn tin đến khi bàn giao
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SITE_CONFIG.process.map((step) => (
            <div
              key={step.number}
              className="rounded-xl bg-[#0B0D13] border border-white/[0.08] p-5 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-semibold text-[#A78BFA] tabular-nums block mb-2">
                  {step.number}
                </span>
                <h3 className="font-display text-base font-bold text-[#F4F5F8] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A2A7B8] leading-relaxed mb-3">
                  {step.description}
                </p>
              </div>

              <p className="pt-3 border-t border-white/[0.06] text-xs text-[#8E93A6]">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
