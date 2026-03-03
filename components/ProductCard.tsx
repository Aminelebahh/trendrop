'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ExternalLink, Heart, ShoppingBag, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { Product } from '@/types'
import TrendBar from './TrendBar'
import { formatPrice, formatNumber, getBadgeColor, getBadgeLabel } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  blurred?: boolean
  isFavorite?: boolean
  onToggleFavorite?: (productId: string) => void
  delay?: number
}

export default function ProductCard({
  product,
  blurred = false,
  isFavorite = false,
  onToggleFavorite,
  delay = 0,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false)

  const href = product.affiliate_url || product.aliexpress_url

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group relative bg-surface border border-border rounded-2xl overflow-hidden hover:border-orange-500/40 transition-all duration-300 hover:shadow-orange"
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getBadgeColor(product.badge)}`}>
            {getBadgeLabel(product.badge)}
          </span>
        </div>
      )}

      {/* Favorite button */}
      {onToggleFavorite && (
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
        >
          <Heart
            size={16}
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>
      )}

      {/* Product Image */}
      <div className={`relative aspect-square bg-surface-2 ${blurred ? 'select-none' : ''}`}>
        {!imgError ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${blurred ? 'blur-md' : ''}`}
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingBag size={48} className="text-gray-600" />
          </div>
        )}

        {blurred && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="text-center">
              <p className="text-white font-semibold text-sm">Premium</p>
              <p className="text-gray-300 text-xs">Déverrouillez ce produit</p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-orange-400 font-medium uppercase tracking-wide">
            {product.category}
          </span>
        </div>

        {/* Name */}
        <h3 className={`font-semibold text-white text-sm leading-tight line-clamp-2 ${blurred ? 'blur-sm select-none' : ''}`}>
          {product.name}
        </h3>

        {/* Price + Orders */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">
            {formatPrice(product.price_eur)}
          </span>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <TrendingUp size={12} />
            <span>{formatNumber(product.orders_count)} commandes</span>
          </div>
        </div>

        {/* Trend Score Bar */}
        <TrendBar score={product.trend_score} size="sm" />

        {/* CTA */}
        {!blurred && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-all duration-200 group/btn"
          >
            <span>Voir sur AliExpress</span>
            <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </a>
        )}
      </div>
    </motion.div>
  )
}
