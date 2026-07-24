// Maps blog/content categories to the site's 3-color accent system,
// so the same category always reads with the same color across pages.
const CATEGORY_COLORS = {
  Marketing: 'var(--color-accent)',
  IA: 'var(--color-accent2)',
  'No-code': 'var(--color-accent3)',
  Productivité: 'var(--color-accent2)',
  Entrepreneuriat: 'var(--color-accent3)',
};

export function categoryColor(category) {
  return CATEGORY_COLORS[category] ?? 'var(--color-accent)';
}
