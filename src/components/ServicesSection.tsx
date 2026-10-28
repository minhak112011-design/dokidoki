import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { SITE_CONFIG, ServiceItem, PageId } from '../config/siteConfig';
import { filterServicesByCategory } from '../utils/briefBuilder';

interface ServicesSectionProps {
  onNavigate: (page: PageId) => void;
}

const SERVICE_FILTERS: Array<{ id: 'all' | ServiceItem['category']; label: string }> = [
  { id: 'all', label: 'Tất cả (4)' },
  { id: 'web', label: 'Web giới thiệu' },
  { id: 'gift', label: 'Web quà tặng' },
  { id: 'fix', label: 'Sửa giao diện' },
  { id: 'tool', label: 'Tiện ích số' },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | ServiceItem['category']>('all');
  const visibleServices = filterServicesByCategory(SITE_CONFIG.services, selectedCategory);

  return (
    <section aria-labelledby="services-heading" className="py-10 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="pb-8 mb-8 border-b border-white/[0.07] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs text-[#A78BFA] font-medium mb-2">
              Dịch vụ nhận làm
            </p>
            <h1
              id="services-heading"
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F4F5F8]"
            >
              Các dự án nhỏ trong phạm vi mình nhận.
            </h1>
          </div>

          <div
            role="group"
            aria-label="Lọc danh mục dịch vụ"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0B0D13] rounded-lg border border-white/[0.08] self-start"
          >
            {SERVICE_FILTERS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                aria-pressed={selectedCategory === tab.id}
                className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[38px] cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#F4F5F8] text-[#06070A] font-semibold'
                    : 'text-[#8E93A6] hover:text-[#F4F5F8]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleServices.map((service) => (
            <article
              key={service.id}
              className="rounded-2xl bg-[#0B0D13] border border-white/[0.08] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-[#8E93A6] mb-2.5">
                  <span className="font-mono text-[#A78BFA] font-medium tabular-nums">
                    {service.number}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{service.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#38BDF8]">{service.pricingNote}</span>
                </div>

                <h2 className="font-display text-xl font-bold text-[#F4F5F8] mb-2">
                  {service.title}
                </h2>

                <p className="text-sm text-[#A2A7B8] leading-relaxed mb-4">
                  {service.summary}
                </p>

                <ul className="space-y-1.5 text-xs sm:text-sm text-[#A2A7B8] mb-5">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[#38BDF8] font-mono" aria-hidden="true">
                        +
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/[0.06] space-y-3">
                <p className="text-xs text-[#8E93A6]">
                  {service.scopeNote}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={SITE_CONFIG.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#06070A] bg-[#F4F5F8] hover:bg-[#A78BFA] rounded-lg transition-colors min-h-[40px] whitespace-nowrap shrink-0"
                  >
                    <span>Nhắn Facebook</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    onClick={() => onNavigate('showcase')}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#8E93A6] hover:text-[#F4F5F8] py-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Xem mẫu concept</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
