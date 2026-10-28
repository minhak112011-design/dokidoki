import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight, Heart } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export const SupportAndFaqSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(SITE_CONFIG.faqs[0]?.id ?? null);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-16 md:space-y-20">
      {/* Ủng Hộ Section — Voluntary, gentle, zero fake QR or wallet info */}
      <section aria-labelledby="support-heading">
        <div className="rounded-2xl bg-[#0B0D13] border border-white/[0.08] p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#A78BFA] font-medium">
                <Heart className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{SITE_CONFIG.supportSection.kicker}</span>
              </div>

              <h2
                id="support-heading"
                className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#F4F5F8] [text-wrap:balance]"
              >
                {SITE_CONFIG.supportSection.headline}
              </h2>

              <p className="text-sm sm:text-base text-[#A2A7B8] leading-relaxed">
                {SITE_CONFIG.supportSection.description}
              </p>

              <p className="text-xs sm:text-sm text-[#8E93A6] pt-1">
                {SITE_CONFIG.supportSection.statusNote}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-end gap-3">
              <a
                href={SITE_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-[#F4F5F8] bg-[#161A26] hover:bg-[#A78BFA] hover:text-[#06070A] border border-white/10 rounded-lg transition-colors min-h-[44px] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A78BFA]"
              >
                <span>{SITE_CONFIG.supportSection.ctaLabel}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
              <span className="text-xs text-[#8E93A6]">
                Hoàn toàn tự nguyện · Minh bạch thông tin
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section — Accessible keyboard-operable accordion */}
      <section aria-labelledby="faq-heading">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-sm text-[#38BDF8] font-medium mb-2">
              Giải đáp thông tin (FAQ)
            </p>
            <h2
              id="faq-heading"
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F5F8] mb-4 [text-wrap:balance]"
            >
              Các câu hỏi thường gặp về phạm vi và quy trình.
            </h2>
            <p className="text-sm sm:text-base text-[#A2A7B8] leading-relaxed">
              Nếu bạn cần trao đổi thêm về một trường hợp cụ thể, vui lòng liên hệ trực tiếp qua Facebook cá nhân của Nhật Minh.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {SITE_CONFIG.faqs.map((faq, index) => {
              const isOpen = openFaqId === faq.id;
              const panelId = `faq-panel-${faq.id}`;
              const buttonId = `faq-btn-${faq.id}`;

              return (
                <div
                  key={faq.id}
                  className="rounded-xl bg-[#0B0D13] border border-white/[0.08] overflow-hidden"
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-semibold text-[#F4F5F8] hover:bg-white/[0.03] transition-colors min-h-[52px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#A78BFA]"
                    >
                      <span className="flex items-start gap-3">
                        <span className="font-mono text-xs text-[#A78BFA] mt-1 tabular-nums">
                          0{index + 1}.
                        </span>
                        <span>{faq.question}</span>
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#8E93A6] shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180 text-[#A78BFA]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="px-5 pb-5 pt-2 text-sm sm:text-base text-[#A2A7B8] leading-relaxed border-t border-white/[0.06]"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
