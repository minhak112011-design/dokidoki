import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { SupportAndFaqSection } from './SupportAndFaqSection';

export const ContactSection: React.FC = () => {
  return (
    <div className="py-10 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-14">
        {/* Direct Contact Card */}
        <section aria-labelledby="contact-heading">
          <div className="pb-8 mb-8 border-b border-white/[0.07]">
            <p className="text-xs text-[#A78BFA] font-medium mb-2">
              Liên hệ trực tiếp
            </p>
            <h1
              id="contact-heading"
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F4F5F8]"
            >
              Nhắn tin cho Nhật Minh qua Facebook.
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7">
              <div className="h-full rounded-2xl bg-[#0B0D13] border border-white/10 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <p className="text-xs text-[#38BDF8] font-medium">
                    Facebook cá nhân chính thức
                  </p>
                  <h2 className="font-display text-2xl font-bold text-[#F4F5F8]">
                    Nhật Minh
                  </h2>
                  <p className="text-sm text-[#A2A7B8] leading-relaxed">
                    Trao đổi ý tưởng làm web, gửi ảnh/nhạc làm web quà tặng hoặc nhờ kiểm tra lỗi giao diện trực tiếp qua tin nhắn Facebook.
                  </p>
                  <p className="font-mono text-xs text-[#8E93A6] break-all p-3 rounded-lg bg-[#06070A] border border-white/[0.06]">
                    {SITE_CONFIG.facebookUrl}
                  </p>
                </div>

                <div>
                  <a
                    href={SITE_CONFIG.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#06070A] bg-[#F4F5F8] hover:bg-[#A78BFA] rounded-lg transition-colors min-h-[44px]"
                  >
                    <span>Mở Facebook Nhật Minh</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full rounded-2xl bg-[#0B0D13] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <h3 className="font-display text-lg font-bold text-[#F4F5F8]">
                    Khi nhắn tin bạn chỉ cần cho mình biết:
                  </h3>
                  <ul className="space-y-3 text-sm text-[#A2A7B8]">
                    <li className="flex items-start gap-2.5">
                      <span className="font-mono text-xs text-[#A78BFA] mt-0.5">01.</span>
                      <span>Bạn muốn làm trang web gì hoặc đang gặp lỗi giao diện nào.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="font-mono text-xs text-[#A78BFA] mt-0.5">02.</span>
                      <span>Nội dung chữ, hình ảnh, nhạc hoặc link code hiện có.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="font-mono text-xs text-[#A78BFA] mt-0.5">03.</span>
                      <span>Mình sẽ xem kỹ và báo giá rõ ràng trước khi nhận làm.</span>
                    </li>
                  </ul>
                </div>

                <p className="text-xs text-[#8E93A6] pt-3 border-t border-white/[0.06]">
                  Chưa gắn Discord hay số điện thoại công khai · Chỉ dùng đúng link Facebook trên.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SupportAndFaqSection />
      </div>
    </div>
  );
};
