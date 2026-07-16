import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number, locale = 'en-RW'): string {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatCurrency(value: number, currency = 'RWF'): string {
  return new Intl.NumberFormat('en-RW', { style: 'currency', currency }).format(value);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
