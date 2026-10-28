import { ShowcaseConcept, ServiceItem, PageId, NAV_PAGES, NavPageItem } from '../config/siteConfig';

/**
 * Xác thực và chuẩn hoá mã trang (PageId) từ hash hoặc tham số điều hướng.
 */
export function resolveActivePage(rawPageId?: string | null): PageId {
  if (!rawPageId) return 'overview';
  const cleaned = rawPageId.replace(/^#/, '').trim().toLowerCase();
  const matched = NAV_PAGES.find((p) => p.id === cleaned);
  return matched ? matched.id : 'overview';
}

/**
 * Lấy thông tin trang trước và trang tiếp theo để điều hướng tuần tự giữa các phần.
 */
export function getAdjacentPages(currentPage: PageId): {
  current: NavPageItem;
  previous: NavPageItem | null;
  next: NavPageItem | null;
} {
  const index = NAV_PAGES.findIndex((p) => p.id === currentPage);
  const safeIndex = index === -1 ? 0 : index;

  return {
    current: NAV_PAGES[safeIndex],
    previous: safeIndex > 0 ? NAV_PAGES[safeIndex - 1] : null,
    next: safeIndex < NAV_PAGES.length - 1 ? NAV_PAGES[safeIndex + 1] : null,
  };
}

/**
 * Lọc danh sách mẫu giao diện (concepts) theo danh mục.
 */
export function filterConceptsByCategory(
  concepts: readonly ShowcaseConcept[],
  category: 'all' | ShowcaseConcept['category']
): ShowcaseConcept[] {
  if (category === 'all') {
    return [...concepts];
  }
  return concepts.filter((item) => item.category === category);
}

/**
 * Lọc danh sách lĩnh vực / dịch vụ theo danh mục.
 */
export function filterServicesByCategory(
  services: readonly ServiceItem[],
  category: 'all' | ServiceItem['category']
): ServiceItem[] {
  if (category === 'all') {
    return [...services];
  }
  return services.filter((item) => item.category === category);
}
