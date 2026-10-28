import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, Volume2, VolumeX, Smartphone, Monitor } from 'lucide-react';
import { ShowcaseConcept, SITE_CONFIG } from '../config/siteConfig';

interface ShowcaseModalProps {
  concept: ShowcaseConcept | null;
  onClose: () => void;
}

export const ShowcaseModal: React.FC<ShowcaseModalProps> = ({ concept, onClose }) => {
  const [previewViewport, setPreviewViewport] = useState<'mobile' | 'desktop'>('mobile');
  const [giftCardOpen, setGiftCardOpen] = useState(false);
  const [giftMusicOn, setGiftMusicOn] = useState(false);
  const [webhookTitle, setWebhookTitle] = useState('Thông báo lịch họp chuyên môn tối thứ Sáu');
  const [webhookBody, setWebhookBody] = useState(
    'Các thành viên vui lòng hoàn tất phần kiểm thử giao diện trước 20h00.'
  );
  const [fixedLayoutMode, setFixedLayoutMode] = useState<'fixed' | 'broken'>('fixed');

  useEffect(() => {
    if (!concept) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [concept, onClose]);

  if (!concept) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-concept-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#0B0D13] border border-white/15 p-5 sm:p-8 my-auto max-h-[90vh] overflow-y-auto">
        {/* Top bar */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#8E93A6] mb-1">
              <span className="font-mono text-[#A78BFA]">{concept.number}</span>
              <span aria-hidden="true">·</span>
              <span>{concept.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#38BDF8]">{concept.statusLabel}</span>
            </div>
            <h3
              id="modal-concept-title"
              className="font-display text-xl sm:text-2xl font-bold text-[#F4F5F8]"
            >
              {concept.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ bản dựng mẫu"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#161A26] text-[#F4F5F8] hover:bg-white/15 transition-colors shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A78BFA]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Interactive Concept Sandbox */}
        <div className="py-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-[#A2A7B8]">
              Môi trường tương tác minh hoạ ngay trên trình duyệt:
            </p>
            <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#06070A] border border-white/[0.08]">
              <button
                type="button"
                onClick={() => setPreviewViewport('mobile')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  previewViewport === 'mobile'
                    ? 'bg-[#161A26] text-[#F4F5F8]'
                    : 'text-[#8E93A6] hover:text-[#F4F5F8]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Khung Di động</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewViewport('desktop')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  previewViewport === 'desktop'
                    ? 'bg-[#161A26] text-[#F4F5F8]'
                    : 'text-[#8E93A6] hover:text-[#F4F5F8]'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Khung Máy tính</span>
              </button>
            </div>
          </div>

          {/* Sandbox Container */}
          <div
            className={`mx-auto rounded-xl bg-[#06070A] border border-white/10 p-4 sm:p-6 transition-all ${
              previewViewport === 'mobile' ? 'max-w-[360px]' : 'w-full'
            }`}
          >
            {concept.interactiveDemoType === 'personal-landing' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <span className="font-display font-bold text-sm text-[#F4F5F8]">
                    Hồ sơ Cá nhân (Concept)
                  </span>
                  <span className="text-xs text-[#38BDF8]">Trực tuyến</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[#F4F5F8]">
                    Trình bày thông tin tinh gọn, cấu trúc phân mục rõ ràng
                  </p>
                  <p className="text-xs text-[#8E93A6] leading-relaxed">
                    Giao diện thích ứng hoàn toàn khi mở từ thiết bị di động, đảm bảo khả năng đọc hiểu nhanh chóng.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-lg bg-[#0F121B] border border-white/[0.06]">
                    <p className="font-medium text-[#F4F5F8]">01. Thiết kế Giao diện</p>
                    <p className="text-[#8E93A6] mt-1">Trao đổi & báo giá trước</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0F121B] border border-white/[0.06]">
                    <p className="font-medium text-[#F4F5F8]">02. Tối ưu Responsive</p>
                    <p className="text-[#8E93A6] mt-1">Hiển thị chuẩn từ 320px</p>
                  </div>
                </div>
              </div>
            )}

            {concept.interactiveDemoType === 'memory-gift' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
                  <span className="font-display font-bold text-sm text-[#F4F5F8] whitespace-nowrap truncate">
                    Không gian Kỷ niệm
                  </span>
                  <button
                    type="button"
                    onClick={() => setGiftMusicOn((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#0F121B] text-xs text-[#38BDF8] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {giftMusicOn ? (
                      <>
                        <Volume2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>Âm thanh: Bật</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>Âm thanh: Tắt</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-lg bg-[#0F121B] border border-white/[0.08] space-y-3">
                  <p className="text-xs text-[#A78BFA]">
                    Cột mốc 01 · Dấu ấn đáng nhớ
                  </p>
                  <p className="text-xs sm:text-sm text-[#F4F5F8] leading-relaxed">
                    {giftCardOpen
                      ? '“Mọi hình ảnh, thông điệp và bản nhạc trên trang được biên tập riêng theo yêu cầu và quyền sử dụng hợp lệ của người gửi.”'
                      : 'Thiệp thông điệp đang ở trạng thái đóng. Nhấn nút bên dưới để kiểm tra tương tác mở.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setGiftCardOpen((prev) => !prev)}
                    className="px-3.5 py-2 rounded-lg bg-[#A78BFA] text-[#06070A] font-semibold text-xs hover:bg-[#C4B5FD] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {giftCardOpen ? 'Đóng thông điệp' : 'Mở thông điệp'}
                  </button>
                </div>
              </div>
            )}

            {concept.interactiveDemoType === 'responsive-fix' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
                  <span className="text-xs font-medium text-[#8E93A6] truncate">
                    Chế độ đối chiếu:
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setFixedLayoutMode((prev) => (prev === 'fixed' ? 'broken' : 'fixed'))
                    }
                    className="px-3 py-1.5 rounded bg-[#161A26] text-xs font-medium text-[#38BDF8] hover:bg-white/10 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {fixedLayoutMode === 'fixed'
                      ? 'Trạng thái: Đã chuẩn hoá'
                      : 'Trạng thái: Lỗi tràn khung'}
                  </button>
                </div>

                {fixedLayoutMode === 'fixed' ? (
                  <div className="p-3.5 rounded-lg bg-[#0F121B] border border-[#38BDF8]/30 space-y-2">
                    <p className="text-xs font-semibold text-[#38BDF8]">
                      Sau khi tối ưu: Hệ thống lưới tự động thích ứng
                    </p>
                    <p className="text-xs text-[#A2A7B8]">
                      Các thành phần tự động xuống dòng theo độ rộng màn hình, khoảng đệm cân đối và vùng chạm đạt chuẩn 44px.
                    </p>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-lg bg-[#0F121B] border border-amber-400/30 space-y-2">
                    <p className="text-xs font-semibold text-amber-300">
                      Trước khi tối ưu: Kích thước cứng gây vỡ bố cục
                    </p>
                    <p className="text-xs text-[#8E93A6]">
                      Sử dụng chiều rộng cố định làm xuất hiện thanh cuộn ngang trên màn hình 320px–375px.
                    </p>
                  </div>
                )}
              </div>
            )}

            {concept.interactiveDemoType === 'audio-discord-check' && (
              <div className="space-y-4">
                <p className="text-xs text-[#8E93A6]">
                  Kiểm tra độ dài hợp lệ của khung bản tin Discord Webhook:
                </p>
                <div className="space-y-2.5">
                  <div>
                    <label
                      htmlFor="demo-webhook-title"
                      className="block text-xs font-medium text-[#F4F5F8] mb-1"
                    >
                      Tiêu đề thông báo ({webhookTitle.length}/256 ký tự)
                    </label>
                    <input
                      id="demo-webhook-title"
                      type="text"
                      maxLength={256}
                      value={webhookTitle}
                      onChange={(e) => setWebhookTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0F121B] border border-white/10 text-xs text-[#F4F5F8]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="demo-webhook-body"
                      className="block text-xs font-medium text-[#F4F5F8] mb-1"
                    >
                      Nội dung chi tiết ({webhookBody.length}/2000 ký tự)
                    </label>
                    <textarea
                      id="demo-webhook-body"
                      rows={2}
                      maxLength={2000}
                      value={webhookBody}
                      onChange={(e) => setWebhookBody(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0F121B] border border-white/10 text-xs text-[#F4F5F8]"
                    />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#0F121B] border border-white/10 space-y-1">
                  <p className="text-[11px] font-mono text-[#A78BFA]">
                    Xem trước cấu trúc Discord Embed hợp lệ
                  </p>
                  <p className="text-xs font-semibold text-[#F4F5F8]">
                    {webhookTitle || '(Chưa nhập tiêu đề)'}
                  </p>
                  <p className="text-xs text-[#A2A7B8]">
                    {webhookBody || '(Chưa nhập nội dung)'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Concept Details */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#F4F5F8]">Thông số kỹ thuật của bản dựng:</p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#A2A7B8]">
              {concept.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2">
                  <span className="text-[#A78BFA] font-mono" aria-hidden="true">
                    ·
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
          <a
            href={SITE_CONFIG.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#06070A] bg-[#F4F5F8] hover:bg-[#A78BFA] rounded-lg transition-colors min-h-[42px]"
          >
            <span>Trao đổi về mẫu này qua Facebook</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-[#8E93A6] hover:text-[#F4F5F8] cursor-pointer"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
