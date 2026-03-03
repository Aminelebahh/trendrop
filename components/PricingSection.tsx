'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Zap, Flame } from 'lucide-react'
import Link from 'next/link'

const freeFeatures = [
  { text: '3 produits tendance par jour', included: true },
  { text: '3 recherches par jour', included: true },
  { text: 'Liens AliExpress directs', included: true },
  { text: 'Filtres avancés', included: false },
  { text: 'Accès illimité aux produits', included: false },
  { text: 'Alertes email tendances', included: false },
  { text: 'Export CSV', included: false },
  { text: 'Support prioritaire', included: false },
]

const premiumFeatures = [
  { text: 'Accès illimité à tous les produits', included: true },
  { text: 'Recherches illimitées', included: true },
  { text: 'Liens AliExpress + liens affiliés', included: true },
  { text: 'Filtres avancés (catégorie, prix, score)', included: true },
  { text: 'Alertes email nouveaux produits', included: true },
  { text: 'Export CSV des tendances', included: true },
  { text: 'Support prioritaire', included: true },
  { text: 'Mises à jour toutes les 6h', included: true },
]

interface PricingSectionProps {
  onSubscribe?: () => void
  loading?: boolean
}

export default function PricingSection({ onSubscribe, loading }: PricingSectionProps) {
  const [hovered, setHovered] = useState<'free' | 'premium' | null>(null)

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {/* Free Plan */}
      <motion.div
        onHoverStart={() => setHovered('free')}
        onHoverEnd={() => setHovered(null)}
        className="relative bg-surface border border-border rounded-2xl p-6 transition-all duration-300"
      >
        <div className="mb-6">
          <span className="text-sm font-medium text-gray-400 uppercase tracking-wide">Gratuit</span>
          <div className="flex items-end gap-1 mt-2">
            <span className="text-4xl font-bold text-white font-display">0€</span>
            <span className="text-gray-400 mb-1">/mois</span>
          </div>
          <p className="text-gray-400 text-sm mt-2">Pour découvrir les tendances du marché</p>
        </div>

        <ul className="space-y-3 mb-8">
          {freeFeatures.map(({ text, included }) => (
            <li key={text} className="flex items-center gap-3">
              {included ? (
                <Check size={16} className="text-green-400 shrink-0" />
              ) : (
                <X size={16} className="text-gray-600 shrink-0" />
              )}
              <span className={`text-sm ${included ? 'text-gray-300' : 'text-gray-600'}`}>{text}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/signup"
          className="block w-full text-center py-3 rounded-xl border border-border text-gray-300 hover:text-white hover:border-gray-500 transition-colors font-medium"
        >
          Commencer gratuitement
        </Link>
      </motion.div>

      {/* Premium Plan */}
      <motion.div
        onHoverStart={() => setHovered('premium')}
        onHoverEnd={() => setHovered(null)}
        className="relative bg-surface border border-orange-500/50 rounded-2xl p-6 shadow-orange overflow-hidden"
      >
        {/* Popular badge */}
        <div className="absolute top-4 right-4">
          <span className="flex items-center gap-1 text-xs bg-orange-500/20 text-orange-400 px-2.5 py-1 rounded-full border border-orange-500/30 font-semibold">
            <Flame size={10} /> Populaire
          </span>
        </div>

        {/* Glow top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

        <div className="mb-6">
          <span className="text-sm font-medium text-orange-400 uppercase tracking-wide">Premium</span>
          <div className="flex items-end gap-1 mt-2">
            <span className="text-4xl font-bold text-white font-display">9,99€</span>
            <span className="text-gray-400 mb-1">/mois</span>
          </div>
          <p className="text-gray-400 text-sm mt-2">Sans engagement — annulable à tout moment</p>
        </div>

        <ul className="space-y-3 mb-8">
          {premiumFeatures.map(({ text }) => (
            <li key={text} className="flex items-center gap-3">
              <Check size={16} className="text-orange-400 shrink-0" />
              <span className="text-sm text-gray-300">{text}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={onSubscribe}
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-orange disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Zap size={18} />
              S'abonner maintenant
            </>
          )}
        </button>

        <p className="text-center text-gray-500 text-xs mt-3">
          Paiement sécurisé par Stripe 🔒
        </p>
      </motion.div>
    </div>
  )
}
