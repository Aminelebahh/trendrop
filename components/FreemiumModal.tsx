'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap, TrendingUp, Search, BarChart3, Download, Bell } from 'lucide-react'
import Link from 'next/link'

interface FreemiumModalProps {
  isOpen: boolean
  onClose: () => void
  message?: string
}

const features = [
  { icon: TrendingUp, text: 'Accès illimité à tous les produits tendance' },
  { icon: Search, text: 'Recherches illimitées' },
  { icon: BarChart3, text: 'Filtres avancés (catégorie, prix, score)' },
  { icon: Bell, text: 'Alertes email nouveaux produits' },
  { icon: Download, text: 'Export CSV des tendances' },
]

export default function FreemiumModal({ isOpen, onClose, message }: FreemiumModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl">
              {/* Header glow */}
              <div className="h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600" />

              <div className="p-6">
                {/* Close */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-2 transition-colors text-gray-400 hover:text-white"
                >
                  <X size={18} />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
                    <Zap size={32} className="text-orange-400" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white text-center font-display mb-2">
                  Passez Premium 🚀
                </h2>
                <p className="text-gray-400 text-center text-sm mb-6">
                  {message ?? 'Vous avez atteint la limite de votre plan gratuit.'}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {features.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-orange-400" />
                      </div>
                      <span className="text-gray-300 text-sm">{text}</span>
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className="bg-surface-2 rounded-xl p-4 mb-6 text-center border border-border">
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-4xl font-bold text-white font-display">9,99€</span>
                    <span className="text-gray-400 mb-1">/mois</span>
                  </div>
                  <p className="text-green-400 text-xs font-medium mt-1">Sans engagement — Annulable à tout moment</p>
                </div>

                {/* CTA */}
                <Link
                  href="/pricing"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 rounded-xl transition-all duration-200 text-base shadow-orange"
                  onClick={onClose}
                >
                  <Zap size={18} />
                  Commencer maintenant
                </Link>

                <button
                  onClick={onClose}
                  className="w-full text-center text-gray-500 text-sm mt-3 hover:text-gray-400 transition-colors"
                >
                  Non merci, rester sur le plan gratuit
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
