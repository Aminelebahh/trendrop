import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(price)
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export function getBadgeColor(badge: string | null): string {
  switch (badge) {
    case 'viral': return 'bg-red-500/20 text-red-400 border-red-500/30'
    case 'rising': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    case 'new': return 'bg-green-500/20 text-green-400 border-green-500/30'
    default: return ''
  }
}

export function getBadgeLabel(badge: string | null): string {
  switch (badge) {
    case 'viral': return '🔥 Viral'
    case 'rising': return '📈 En hausse'
    case 'new': return '✨ Nouveau'
    default: return ''
  }
}

export function getTrendScoreColor(score: number): string {
  if (score >= 80) return 'text-red-400'
  if (score >= 60) return 'text-orange-400'
  if (score >= 40) return 'text-yellow-400'
  return 'text-gray-400'
}

export function getTrendScoreBarColor(score: number): string {
  if (score >= 80) return 'from-red-500 to-orange-500'
  if (score >= 60) return 'from-orange-500 to-yellow-500'
  if (score >= 40) return 'from-yellow-500 to-green-500'
  return 'from-gray-500 to-gray-400'
}
