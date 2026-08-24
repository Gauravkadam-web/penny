// Utility to deterministically assign aesthetic palette colors to category names

const PALETTE = [
  { className: 'badge--cat-emerald', barColor: 'var(--color-ledger)' },
  { className: 'badge--cat-blue', barColor: '#2563EB' },
  { className: 'badge--cat-purple', barColor: '#7C3AED' },
  { className: 'badge--cat-amber', barColor: '#D97706' },
  { className: 'badge--cat-rose', barColor: '#E11D48' },
  { className: 'badge--cat-indigo', barColor: '#4F46E5' },
  { className: 'badge--cat-cyan', barColor: '#0891B2' },
  { className: 'badge--cat-orange', barColor: '#EA580C' },
];

/**
 * Returns a consistent palette style based on category name string
 * @param {string} categoryName
 * @returns {{ className: string, barColor: string }}
 */
export const getCategoryColor = (categoryName = '') => {
  if (!categoryName) return PALETTE[0];
  let hash = 0;
  for (let i = 0; i < categoryName.length; i++) {
    hash = categoryName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % PALETTE.length;
  return PALETTE[index];
};
