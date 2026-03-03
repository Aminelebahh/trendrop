'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Crown, Heart, Download, Settings,
  TrendingUp, Calendar, Check, X, ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import { Profile, Favorite, TrendUpdate } from '@/types'
import ProductCard from '@/components/ProductCard'
import { formatPrice } from '@/lib/utils'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

interface DashboardClientProps {
  profile: Profile | null
  favorites: Favorite[]
  lastUpdate: TrendUpdate | null
  showSuccess: boolean
}

export default function DashboardClient({ profile, favorites, lastUpdate, showSuccess }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'favorites'>('overview')
  const [showSuccessBanner, setShowSuccessBanner] = useState(showSuccess)
  const [downloadingCsv, setDownloadingCsv] = useState(false)
  const [portalLoading, setPortalLoading] = useState(false)
  const [favIds, setFavIds] = useState<string[]>(favorites.map((f) => f.product_id))

  useEffect(() => {
    if (showSuccess) {
      const t = setTimeout(() => setShowSuccessBanner(false), 6000)
      return () => clearTimeout(t)
    }
  }, [showSuccess])

  const handleDownloadCsv = async () => {
    if (!profile?.is_premium) return
    setDownloadingCsv(true)
    try {
      const res = await fetch('/api/products?format=csv&limit=100')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `trenddrop-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setDownloadingCsv(false)
    }
  }

  const handleManageSubscription = async () => {
    setPortalLoading(true)
    const res = await fetch('/api/stripe/portal', { method: 'POST' })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    setPortalLoading(false)
  }

  const handleToggleFavorite = async (productId: string) => {
    const supabase = createSupabaseBrowserClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    if (favIds.includes(productId)) {
      await supabase.from('favorites').delete().match({ user_id: user.id, product_id: productId })
      setFavIds((prev) => prev.filter((id) => id !== productId))
    } else {
      await supabase.from('favorites').insert({ user_id: user.id, product_id: productId })
      setFavIds((prev) => [...prev, productId])
    }
  }

  const renewalDate = profile?.subscription_ends_at
    ? new Date(profile.subscription_ends_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Success banner */}
      <AnimatePresence>
        {showSuccessBanner && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 bg-green-500/10 border border-green-500/30 rounded-2xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check size={16} className="text-green-400" />
              </div>
              <div>
                <p className="text-green-400 font-semibold text-sm">Bienvenue dans TrendDrop Premium !</p>
                <p className="text-gray-400 text-xs">Votre abonnement est actif. Profitez d'un accès illimité.</p>
              </div>
            </div>
            <button onClick={() => setShowSuccessBanner(false)}>
              <X size={16} className="text-gray-500 hover:text-white transition-colors" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LayoutDashboard size={20} className="text-orange-400" />
            <h1 className="text-3xl font-bold font-display text-white">Dashboard</h1>
          </div>
          <p className="text-gray-400 text-sm">Bonjour, {profile?.email?.split('@')[0]} 👋</p>
        </div>
        {profile?.is_premium && (
          <span className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 px-3 py-1.5 rounded-full text-sm font-semibold">
            <Crown size={14} /> Premium
          </span>
        )}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-surface border border-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={16} className="text-orange-400" />
            <span className="text-gray-400 text-sm">Produits disponibles</span>
          </div>
          <p className="text-3xl font-bold font-display text-white">
            {profile?.is_premium ? '∞' : '3/jour'}
          </p>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Heart size={16} className="text-red-400" />
            <span className="text-gray-400 text-sm">Favoris sauvegardés</span>
          </div>
          <p className="text-3xl font-bold font-display text-white">{favorites.length}</p>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={16} className="text-blue-400" />
            <span className="text-gray-400 text-sm">Dernière mise à jour</span>
          </div>
          <p className="text-sm font-semibold text-white">
            {lastUpdate ? new Date(lastUpdate.ran_at).toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '—'}
          </p>
        </div>
      </div>

      {/* Subscription card */}
      <div className={`mb-8 p-5 rounded-2xl border ${profile?.is_premium ? 'bg-orange-500/5 border-orange-500/20' : 'bg-surface border-border'}`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-white font-semibold flex items-center gap-2">
              {profile?.is_premium ? <><Crown size={16} className="text-orange-400" /> Abonnement Premium</> : 'Plan Gratuit'}
            </h3>
            {profile?.is_premium && renewalDate && (
              <p className="text-gray-400 text-sm mt-1">Renouvellement le {renewalDate}</p>
            )}
            {!profile?.is_premium && (
              <p className="text-gray-400 text-sm mt-1">Passez Premium pour un accès illimité</p>
            )}
          </div>
          <div className="flex gap-3 flex-wrap">
            {profile?.is_premium ? (
              <button
                onClick={handleManageSubscription}
                disabled={portalLoading}
                className="flex items-center gap-2 text-sm bg-surface-2 border border-border hover:border-gray-500 text-white px-4 py-2 rounded-xl transition-colors disabled:opacity-60"
              >
                <Settings size={14} />
                {portalLoading ? 'Chargement...' : 'Gérer l\'abonnement'}
              </button>
            ) : (
              <Link
                href="/pricing"
                className="flex items-center gap-2 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-4 py-2 rounded-xl"
              >
                <Crown size={14} /> Passer Premium
              </Link>
            )}
            {profile?.is_premium && (
              <button
                onClick={handleDownloadCsv}
                disabled={downloadingCsv}
                className="flex items-center gap-2 text-sm bg-surface-2 border border-border hover:border-green-500/30 text-white px-4 py-2 rounded-xl transition-colors disabled:opacity-60"
              >
                <Download size={14} />
                {downloadingCsv ? 'Export...' : 'Export CSV'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border">
        {(['overview', 'favorites'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
              activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab === 'overview' ? 'Aperçu' : `Mes favoris (${favorites.length})`}
            {activeTab === tab && (
              <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-4">Informations du compte</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Email</span>
                <span className="text-white">{profile?.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Plan</span>
                <span className={profile?.is_premium ? 'text-orange-400 font-semibold' : 'text-gray-300'}>
                  {profile?.is_premium ? 'Premium' : 'Gratuit'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Membre depuis</span>
                <span className="text-white">
                  {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('fr-FR') : '—'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-4">Accès rapide</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tendances', label: 'Voir les tendances', icon: TrendingUp },
                { href: '/recherche', label: 'Rechercher un produit', icon: ExternalLink },
                { href: '/pricing', label: 'Changer de plan', icon: Crown },
              ].map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 bg-surface-2 border border-border hover:border-orange-500/30 rounded-xl p-4 transition-colors group"
                >
                  <Icon size={16} className="text-orange-400" />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'favorites' && (
        <div>
          {favorites.length === 0 ? (
            <div className="text-center py-16">
              <Heart size={48} className="text-gray-700 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">Aucun favori</h3>
              <p className="text-gray-500 text-sm mb-4">Sauvegardez vos produits préférés depuis la page Tendances</p>
              <Link href="/tendances" className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                Explorer les tendances →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((fav, i) =>
                fav.product ? (
                  <ProductCard
                    key={fav.id}
                    product={fav.product}
                    isFavorite={favIds.includes(fav.product_id)}
                    onToggleFavorite={handleToggleFavorite}
                    delay={i * 0.05}
                  />
                ) : null
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
