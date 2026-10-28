/**
 * Cấu hình nội dung ngắn gọn, súc tích, không dài dòng hay sáo rỗng AI.
 */

export type PageId = 'overview' | 'about' | 'capabilities' | 'showcase' | 'contact';

export interface NavPageItem {
  id: PageId;
  label: string;
  shortTitle: string;
  subtitle: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: 'web' | 'gift' | 'tool' | 'fix';
  categoryLabel: string;
  summary: string;
  deliverables: string[];
  scopeNote: string;
  pricingNote: string;
}

export interface ShowcaseConcept {
  id: string;
  number: string;
  title: string;
  category: 'landing' | 'gift' | 'frontend' | 'utility';
  categoryLabel: string;
  statusLabel: string;
  summary: string;
  features: string[];
  techNotes: string;
  interactiveDemoType: 'personal-landing' | 'memory-gift' | 'audio-discord-check' | 'responsive-fix';
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const NAV_PAGES: readonly NavPageItem[] = [
  {
    id: 'overview',
    label: 'Trang chủ',
    shortTitle: 'Trang chủ',
    subtitle: 'Giới thiệu nhanh & Mô hình 3D tương tác',
  },
  {
    id: 'capabilities',
    label: 'Dịch vụ',
    shortTitle: 'Dịch vụ nhận làm',
    subtitle: 'Web cơ bản, web quà tặng, sửa lỗi giao diện & tiện ích nhỏ',
  },
  {
    id: 'about',
    label: 'Về Minh',
    shortTitle: 'Về Nhật Minh & Quy trình',
    subtitle: 'Thông tin ngắn gọn và 4 bước làm việc',
  },
  {
    id: 'showcase',
    label: 'Mẫu giao diện',
    shortTitle: 'Mẫu Concept',
    subtitle: 'Các bản dựng mẫu để xem thử trực tiếp',
  },
  {
    id: 'contact',
    label: 'Liên hệ',
    shortTitle: 'Liên hệ & Hỏi đáp',
    subtitle: 'Nhắn Facebook, ủng hộ tự nguyện & câu hỏi thường gặp',
  },
] as const;

export const SITE_CONFIG = {
  ownerName: 'Nhật Minh',
  brandMark: 'Nhật Minh',
  roleSummary: 'Học sinh tự học lập trình · Làm web cơ bản & tiện ích số',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61594074891915&locale=vi_VN',

  discordInviteUrl: null as string | null,
  contactEmail: null as string | null,
  donateAccountInfo: null as string | null,

  hero: {
    kicker: 'Nhật Minh · Học sinh tự học lập trình',
    headline: 'Làm website gọn đẹp, web quà tặng cá nhân hoá và sửa lỗi giao diện.',
    description:
      'Mình nhận các dự án nhỏ vừa sức: trang giới thiệu cá nhân, web kỷ niệm theo yêu cầu, chỉnh giao diện responsive trên điện thoại và một số tiện ích nhỏ cho Discord hoặc âm thanh.',
    primaryCta: 'Nhắn Facebook',
    secondaryCta: 'Xem dịch vụ',
    tertiaryCta: 'Xem mẫu concept',
    honestCommitments: [
      {
        label: 'Báo giá trước',
        value: 'Trao đổi rõ phạm vi và thống nhất chi phí trước khi code.',
      },
      {
        label: 'Chuẩn điện thoại',
        value: 'Hiển thị gọn từ màn hình nhỏ 320px đến máy tính.',
      },
      {
        label: 'Nói thật khả năng',
        value: 'Làm được phần nào nhận phần đó, vượt sức sẽ báo thẳng.',
      },
    ],
  },

  overviewPillars: [
    {
      id: 'pillar-capabilities',
      targetPage: 'capabilities' as PageId,
      number: '01.',
      title: 'Dịch vụ nhận làm',
      description: 'Web giới thiệu cơ bản, web quà tặng, sửa lỗi giao diện và tiện ích số.',
      actionLabel: 'Xem Dịch vụ',
    },
    {
      id: 'pillar-about',
      targetPage: 'about' as PageId,
      number: '02.',
      title: 'Về Nhật Minh & Quy trình',
      description: 'Đôi nét về mình và 4 bước phối hợp ngắn gọn từ lúc nhắn tin đến khi bàn giao.',
      actionLabel: 'Xem Về Minh',
    },
    {
      id: 'pillar-showcase',
      targetPage: 'showcase' as PageId,
      number: '03.',
      title: 'Mẫu giao diện (Concept)',
      description: '4 bản dựng minh hoạ có thể bấm xem thử trực tiếp ngay trên web.',
      actionLabel: 'Xem Mẫu giao diện',
    },
    {
      id: 'pillar-contact',
      targetPage: 'contact' as PageId,
      number: '04.',
      title: 'Liên hệ, Ủng hộ & FAQ',
      description: 'Link Facebook chính thức, mục ủng hộ tự nguyện và giải đáp nhanh.',
      actionLabel: 'Mở trang Liên hệ',
    },
  ],

  services: [
    {
      id: 'basic-landing',
      number: '01.',
      title: 'Website cơ bản & Landing page giới thiệu',
      category: 'web',
      categoryLabel: 'Web giới thiệu',
      summary:
        'Trang giới thiệu cá nhân, nhóm nhỏ hoặc dịch vụ đơn giản. Bố cục thoáng, tải nhanh và dễ xem trên điện thoại.',
      deliverables: [
        'Thiết kế gọn theo đúng nội dung thật của bạn',
        'Hiển thị mượt trên cả điện thoại và máy tính',
        'Gắn sẵn nút liên hệ dẫn thẳng về Facebook hoặc kênh bạn dùng',
      ],
      scopeNote: 'Phù hợp cho trang giới thiệu tĩnh, không gồm hệ thống thanh toán phức tạp.',
      pricingNote: 'Trao đổi và báo giá trước',
    },
    {
      id: 'gift-website',
      number: '02.',
      title: 'Website quà tặng người yêu & trang kỷ niệm',
      category: 'gift',
      categoryLabel: 'Web quà tặng',
      summary:
        'Trang web riêng lưu giữ lời chúc, cột mốc kỷ niệm, hình ảnh và nhạc nền theo câu chuyện của hai người.',
      deliverables: [
        'Cá nhân hoá nội dung, màu sắc và hiệu ứng mở thư kỷ niệm',
        'Tích hợp nút bật/tắt nhạc chủ động và bộ ảnh kỷ niệm',
        'Dùng ảnh và nhạc do bạn cung cấp hoặc có quyền sử dụng',
      ],
      scopeNote: 'Bạn chuẩn bị lời nhắn, ảnh và bài nhạc; mình sẽ dựng thành trang web hoàn chỉnh.',
      pricingNote: 'Trao đổi và báo giá trước',
    },
    {
      id: 'frontend-fix',
      number: '03.',
      title: 'Chỉnh giao diện responsive & sửa lỗi frontend nhỏ',
      category: 'fix',
      categoryLabel: 'Sửa giao diện',
      summary:
        'Hỗ trợ kiểm tra và sửa lỗi trang web bị tràn ngang trên điện thoại, lệch nút, vỡ khung hoặc lỗi font tiếng Việt.',
      deliverables: [
        'Xem code trước để xác định đúng nguyên nhân lỗi',
        'Căn chỉnh lại bố cục vừa vặn từ màn hình 320px trở lên',
        'Ghi chú lại những chỗ đã sửa để bạn dễ quản lý',
      ],
      scopeNote: 'Chỉ nhận sau khi đã xem code và chắc chắn xử lý được lỗi đó.',
      pricingNote: 'Xem code trước · Báo giá trước khi sửa',
    },
    {
      id: 'digital-utility',
      number: '04.',
      title: 'Tool / Hook / Tiện ích nhỏ cho Discord hoặc âm thanh',
      category: 'tool',
      categoryLabel: 'Tiện ích số',
      summary:
        'Một số tiện ích nhỏ cho Discord hoặc cấu hình âm thanh cơ bản khi đã xác nhận rõ chức năng và độ tương thích.',
      deliverables: [
        'Kiểm tra trước tính năng và môi trường chạy thực tế',
        'Hướng dẫn cách dùng rõ ràng trong phạm vi đã hẹn',
        'Không làm công cụ lấy cắp tài khoản, spam hay vượt bảo mật',
      ],
      scopeNote: 'Chỉ nhận khi đã xác nhận rõ phạm vi sử dụng hợp lệ và tính tương thích.',
      pricingNote: 'Trao đổi và báo giá theo yêu cầu',
    },
  ] satisfies ServiceItem[],

  about: {
    kicker: 'Về Nhật Minh',
    headline: 'Đang đi học, thích công nghệ và tự học lập trình qua từng dự án thực tế.',
    paragraphs: [
      'Mình là Nhật Minh. Ngoài giờ học trên lớp, mình dành thời gian tự học làm web và tìm hiểu công nghệ. Mình muốn nhận các dự án nhỏ phù hợp để vừa giúp bạn có sản phẩm ưng ý, vừa tích luỹ thêm kinh nghiệm.',
      'Làm việc trực tiếp với mình rất gọn: trao đổi thẳng qua Facebook, báo giá rõ trước khi làm, ưu tiên giao diện dễ xem trên điện thoại và nói thật ngay từ đầu nếu yêu cầu vượt quá khả năng hiện tại.',
    ],
    workingPrinciples: [
      {
        title: 'Nói thật khả năng',
        detail: 'Cái nào làm tốt mình nhận, cái nào vượt sức mình sẽ nói thẳng để bạn đỡ mất thời gian.',
      },
      {
        title: 'Báo giá trước',
        detail: 'Chốt rõ chi phí, số lần chỉnh sửa và cách bàn giao trước khi bắt đầu code.',
      },
      {
        title: 'Ưu tiên điện thoại',
        detail: 'Kiểm tra kỹ từ màn hình nhỏ 320px để mở qua Messenger không bị vỡ khung.',
      },
      {
        title: 'An toàn & Tôn trọng',
        detail: 'Giữ kín nội dung/ảnh riêng tư của khách; từ chối mọi tool gây hại hoặc spam.',
      },
    ],
    technicalSpecs: [
      { category: 'Làm web & Giao diện', items: 'HTML5, CSS3, JavaScript, TypeScript, React, Tailwind CSS' },
      { category: 'Đồ hoạ & Tương tác', items: 'Three.js (3D WebGL tối ưu), CSS/SVG Animation nhẹ, Responsive 320px+' },
      { category: 'Phạm vi nhận việc', items: 'Landing page cơ bản, Web quà tặng, Sửa lỗi frontend, Tiện ích nhỏ hợp lệ' },
    ],
  },

  process: [
    {
      number: '01.',
      title: 'Nhắn ý tưởng',
      description: 'Bạn nhắn qua Facebook cho mình biết nhu cầu làm web, tư liệu hiện có hoặc lỗi cần sửa.',
      detail: 'Trao đổi trực tiếp, nhanh gọn.',
    },
    {
      number: '02.',
      title: 'Báo giá trước',
      description: 'Mình xem yêu cầu, xác nhận những phần làm được và báo chi phí trọn gói trước.',
      detail: 'Đồng ý mới bắt đầu làm.',
    },
    {
      number: '03.',
      title: 'Dựng & Xem thử',
      description: 'Mình code giao diện, kiểm tra trên điện thoại và máy tính rồi gửi link bạn xem thử.',
      detail: 'Hỗ trợ chỉnh sửa theo thoả thuận.',
    },
    {
      number: '04.',
      title: 'Bàn giao',
      description: 'Gửi toàn bộ code sạch sẽ hoặc hỗ trợ đưa lên đường dẫn truy cập kèm hướng dẫn.',
      detail: 'Sẵn sàng hỗ trợ nếu có lỗi hiển thị.',
    },
  ] satisfies ProcessStep[],

  showcaseConcepts: [
    {
      id: 'concept-personal-bio',
      number: '01.',
      title: 'Mẫu trang giới thiệu cá nhân & dịch vụ',
      category: 'landing',
      categoryLabel: 'Landing Page',
      statusLabel: 'Concept minh hoạ',
      summary:
        'Bố cục gọn cho cá nhân hoặc nhóm nhỏ muốn gom thông tin giới thiệu, dịch vụ và liên hệ về một trang.',
      features: [
        'Bố cục rõ ràng, mở nhanh trên trình duyệt điện thoại',
        'Không dùng hiệu ứng rườm rà gây giật lag',
      ],
      techNotes: 'HTML5 · Tailwind CSS · Responsive',
      interactiveDemoType: 'personal-landing',
    },
    {
      id: 'concept-memory-gift',
      number: '02.',
      title: 'Mẫu trang kỷ niệm & hộp thư lời chúc',
      category: 'gift',
      categoryLabel: 'Web Quà Tặng',
      statusLabel: 'Concept minh hoạ',
      summary:
        'Mẫu web quà tặng có dòng thời gian kỷ niệm, thẻ mở thư tay và nút bật/tắt nhạc nền chủ động.',
      features: [
        'Hiệu ứng mở thư mượt, tôn trọng cài đặt giảm chuyển động',
        'Trình phát nhạc chủ động, không tự phát gây giật mình',
      ],
      techNotes: 'React · Audio Control · Giữ chuẩn tỷ lệ ảnh',
      interactiveDemoType: 'memory-gift',
    },
    {
      id: 'concept-responsive-refactor',
      number: '03.',
      title: 'Mẫu đối chiếu sửa lỗi tràn ngang mobile',
      category: 'frontend',
      categoryLabel: 'Frontend Fix',
      statusLabel: 'Concept minh hoạ',
      summary:
        'Ví dụ cách xử lý giao diện bị cố định chiều rộng làm vỡ khung trên màn hình điện thoại nhỏ.',
      features: [
        'Chuyển sang lưới tự co giãn vừa màn hình 320px–375px',
        'Nút bấm đủ rộng (44px+) dễ thao tác bằng ngón tay',
      ],
      techNotes: 'CSS Grid · Flexbox · Fluid Typography',
      interactiveDemoType: 'responsive-fix',
    },
    {
      id: 'concept-webhook-formatter',
      number: '04.',
      title: 'Mẫu kiểm tra tin nhắn Discord Webhook',
      category: 'utility',
      categoryLabel: 'Tiện ích số',
      statusLabel: 'Concept minh hoạ',
      summary:
        'Tiện ích nhỏ xem trước bố cục và giới hạn ký tự thông báo gửi qua Discord Webhook chính thức.',
      features: [
        'Kiểm tra giới hạn tiêu đề (256) và nội dung (2000 ký tự)',
        'Chạy trực tiếp trên trình duyệt, an toàn và hợp lệ',
      ],
      techNotes: 'Client-side · Discord Embed chuẩn',
      interactiveDemoType: 'audio-discord-check',
    },
  ] satisfies ShowcaseConcept[],

  supportSection: {
    kicker: 'Ủng hộ tự nguyện',
    headline: 'Nếu sản phẩm của mình hữu ích, một lời cảm ơn đã là động lực lớn rồi.',
    description:
      'Mục ủng hộ này hoàn toàn tự nguyện, không tạo áp lực. Hiện mình chưa gắn QR hay ví điện tử trên web; nếu muốn động viên, bạn cứ nhắn qua Facebook cho mình.',
    statusNote: 'Chưa gắn cổng thanh toán/QR · Liên hệ qua Facebook nếu cần',
    ctaLabel: 'Ủng hộ Minh qua Facebook',
  },

  faqs: [
    {
      id: 'faq-pricing',
      question: 'Giá làm web được tính như thế nào?',
      answer:
        'Mình trao đổi yêu cầu và báo giá trước khi làm tuỳ theo độ dài trang và các mục tương tác bạn cần. Bạn thấy hợp lý mới bắt đầu.',
    },
    {
      id: 'faq-gift-assets',
      question: 'Làm web quà tặng cần chuẩn bị gì?',
      answer:
        'Bạn chỉ cần gửi lời chúc, các cột mốc kỷ niệm, ảnh và bài nhạc bạn muốn dùng. Mình sẽ lo phần sắp xếp giao diện và code.',
    },
    {
      id: 'faq-tools-safety',
      question: 'Tool Discord hay âm thanh nhận làm trong phạm vi nào?',
      answer:
        'Chỉ nhận các tiện ích nhỏ hợp lệ khi đã kiểm tra rõ tính tương thích. Không nhận làm công cụ chiếm đoạt tài khoản, lấy dữ liệu lén hay spam.',
    },
    {
      id: 'faq-revisions',
      question: 'Có được chỉnh sửa lại sau khi xem bản nháp không?',
      answer:
        'Có. Mình gửi link xem trước trên điện thoại và máy tính để bạn góp ý chỉnh lại câu chữ, màu sắc và bố cục trong phạm vi đã thống nhất.',
    },
  ] satisfies FaqItem[],
} as const;
