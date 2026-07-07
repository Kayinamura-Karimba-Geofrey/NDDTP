/** Bolt-style chart colors */
export const CHART_COLORS = {
  primary: '#0f172a',
  secondary: '#64748b',
  tertiary: '#94a3b8',
  grid: '#e2e8f0',
  axis: '#64748b',
  tooltipBg: '#ffffff',
  tooltipBorder: '#e2e8f0',
} as const;

export const chartAxisStyle = { fontSize: 12, fill: CHART_COLORS.axis, fontWeight: 500 };
export const chartTooltipStyle = {
  contentStyle: {
    backgroundColor: CHART_COLORS.tooltipBg,
    border: `1px solid ${CHART_COLORS.tooltipBorder}`,
    borderRadius: '8px',
    fontSize: '13px',
    boxShadow: '0 4px 6px -1px rgb(15 23 42 / 0.08)',
    color: '#0f172a',
  },
  labelStyle: { color: '#0f172a', fontWeight: 600 },
  itemStyle: { color: '#334155' },
};
