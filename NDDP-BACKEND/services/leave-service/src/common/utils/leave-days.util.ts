export function calculateLeaveDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (end < start) return 0;
  const diff = end.getTime() - start.getTime();
  return Math.floor(diff / 86400000) + 1;
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}
