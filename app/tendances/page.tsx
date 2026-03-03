'use client'

import { useState, useEffect, useCallback } from 'react'
import { Flame, Filter, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { Product } from '@/types'
import ProductCard from '@/components/ProductCard'
import ProductSkeleton from '@/components/ProductSkeleton'
import FreemiumModal from '@/components/FreemiumModal'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

const CATEGORIES = ['Tous', 'Mode', 'High-Tech', 'Maison', 'Beauté', 'Sport', 'Enfants', 'Bijoux']
const BADGES = ['Tous', 'viral', 'rising', 'new']
const SORTS = [
  { label: 'Score (décroissant)', value: 'score_desc' },
  { label: 'Nouveauté', value: 'newest' },
  { label: 'Prix (croissant)', value: 'price_asc' },
  { label: 'Prix (décroissant)', value: 'price_desc' },
  { label: 'Commandes', value: 'orders_desc' },
]

export default function TendancesPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isPremium, setIsPremium] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // Filters (premium only)
  const [category, setCategory] = useState('Tous')
  const [badge, setBadge] = useState('Tous')
  const [sort, setSort] = useState('score_desc')
  const [minScore, setMinScore] = useState(0)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(500)

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      const { data } = await supabase.from('profiles').select('is_premium').eq('id', user.id).single()
      setIsPremium(data?.is_premium ?? false)
    })
  }, [])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (isPremium) {
      if (category !== 'Tous') params.set('category', category)
      if (badge !== 'Tous') params.set('badge', badge)
      params.set('sort', sort)
      params.set('minScore', String(minScore))
      params.set('minPrice', String(minPrice))
      params.set('maxPrice', String(maxPrice))
    }

    const res = await fetch(`/api/products?${params.toString()}`)
    const data = await res.json()
    setProducts(data.products ?? [])
    setLoading(false)
  }, [isPremium, category, badge, sort, minScore, minPrice, maxPrice])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const visibleProducts = isPremium ? products : products.slice(0, 3)
  const lockedProducts = isPremium ? [] : products.slice(3, 9)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Flame size={20} className="text-orange-400" />
          <h1 className="text-3xl font-bold font-display text-white">Tendances du jour</h1>
        </div>
        <p className="text-gray-400 text-sm">
          {loading ? 'Chargement...' : `${products.length} produits analysés · Mis à jour il y a 2h`}
        </p>
      </div>

      {/* Premium Filters */}
      {isPremium && (
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-surface border border-border px-4 py-2.5 rounded-xl transition-colors"
          >
            <SlidersHorizontal size={16} />
            Filtres avancés
            <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 bg-surface border border-border rounded-2xl p-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category */}
                <div>
                  <label className="text-xs text-gray-500 mb-2 block">Catégorie</label>
                  <div className="flex flex-wrap gap-1.5">
                    {CATEGORIES.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCategory(c)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                          category === c
                            ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                            : 'border-border text-gray-500 hover:text-gray-300'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Badge */}
                <div>
                  <label className="text-xs text-gray-500 mb-2 block">Badge</label>
                  <div className="flex flex-wrap gap-1.5">
                    {BADGES.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBadge(b)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors capitalize ${
                          badge === b
                            ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                            : 'border-border text-gray-500 hover:text-gray-300'
                        }`}
                      >
                        {b === 'viral' ? '🔥 Viral' : b === 'rising' ? '📈 En hausse' : b === 'new' ? '✨ Nouveau' : b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-xs text-gray-500 mb-2 block">Trier par</label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50"
                  >
                    {SORTS.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>

                {/* Score minimum */}
                <div>
                  <label className="text-xs text-gray-500 mb-2 block">Score minimum : {minScore}</label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={minScore}
                    onChange={(e) => setMinScore(Number(e.target.value))}
                    className="w-full accent-orange-500"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Freemium Banner */}
      {!isPremium && (
        <div className="mb-6 p-4 bg-orange-500/5 border border-orange-500/20 rounded-2xl flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Flame size={18} className="text-orange-400" />
            <div>
              <p className="text-white text-sm font-semibold">Plan gratuit — 3 produits visibles</p>
              <p className="text-gray-400 text-xs">Passez Premium pour accéder à tous les produits et filtres</p>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="text-xs bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-4 py-2 rounded-lg"
          >
            Passer Premium
          </button>
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 0.05} />
            ))}
            {lockedProducts.map((p, i) => (
              <div key={p.id} className="cursor-pointer" onClick={() => setShowModal(true)}>
                <ProductCard product={p} blurred delay={i * 0.05} />
              </div>
            ))}
          </div>

          {!isPremium && products.length > 3 && (
            <div className="mt-10 text-center">
              <div className="inline-block bg-surface border border-border rounded-2xl p-6 max-w-sm">
                <p className="text-white font-semibold mb-2">+ {products.length - 3} produits cachés</p>
                <p className="text-gray-400 text-sm mb-4">Accédez à tous les produits avec TrendDrop Premium</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm"
                >
                  Voir tous les produits
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <FreemiumModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message="Accédez à tous les produits tendance et filtres avancés."
      />
    </div>
  )
}
