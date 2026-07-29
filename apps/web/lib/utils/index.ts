import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId() {
  return crypto.randomUUID()
}

export function formatDate(date: Date, fmt = 'PPP'): string {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date)
}
