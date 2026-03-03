'use client'

import { motion } from 'framer-motion'
import { getTrendScoreBarColor, getTrendScoreColor } from '@/lib/utils'

interface TrendBarProps {
  score: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function TrendBar({ score, showLabel = true, size = 'md' }: TrendBarProps) {
  const barColor = getTrendScoreBarColor(score)
  const textColor = getTrendScoreColor(score)

  const heights = { sm: 'h-1', md: 'h-1.5', lg: 'h-2' }
  const barHeight = heights[size]

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-500 font-medium">Score tendance</span>
          <span className={`text-sm font-bold ${textColor}`}>🔥 {score}/100</span>
        </div>
      )}
      <div className={`w-full bg-surface-3 rounded-full ${barHeight} overflow-hidden`}>
        <motion.div
          className={`${barHeight} rounded-full bg-gradient-to-r ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  )
}
