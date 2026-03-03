'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Flame, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Product } from '@/types'
import ProductCard from '@/components/ProductCard'
import ProductSkeleton from '@/components/ProductSkeleton'
import FreemiumModal from '@/components/FreemiumModal'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

export default function RecherchePage() {
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  const [isPremium, setIsPremium] = useState(false)
  const [searchesUsed, setSearchesUsed] = useState(0)
  const [searchesLimit] = useState(3)
  const [userId, setUserId] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      setUserId(user.id)
      const { data } = await supabase
        .from('profiles')
        .select('is_premium, daily_searches_count')
        .eq('id', user.id)
        .single()
      setIsPremium(data?.is_premium ?? false)
      setSearchesUsed(data?.daily_searches_count ?? 0)
    })
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // Check limits
    if (!isPremium && searchesUsed >= searchesLimit) {
      setModalMessage('Vous avez atteint votre limite de 3 recherches quotidiennes. Passez Premium pour des recherches illimitées !')
      setShowModal(true)
      return
    }

    if (!userId) {
      setModalMessage('Connectez-vous pour effectuer des recherches.')
      setShowModal(true)
      return
    }

    setLoading(true)
    setSearched(true)

    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
    const data = await res.json()

    if (data.limited) {
      setModalMessage(data.message)
      setShowModal(true)
      setLoading(false)
      return
    }

    setProducts(data.products ?? [])
    setSearchesUsed((prev) => prev + 1)
    setLoading(false)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Search size={20} className="text-orange-400" />
          <h1 className="text-3xl font-bold font-display text-white">Recherche</h1>
        </div>
        <p className="text-gray-400 text-sm">
          Recherchez un produit spécifique parmi notre base de données de tendances
        </p>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative max-w-2xl">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex: montre connectée, lampe led, écouteurs sans fil..."
            className="w-full bg-surface border border-border rounded-2xl pl-11 pr-32 py-4 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-colors"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-5 py-2 rounded-xl text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Rechercher
          </button>
        </div>
      </form>

      {/* Freemium counter */}
      {!isPremium && userId && (
        <div className={`mb-6 p-3 rounded-xl border flex items-center gap-3 max-w-sm ${
          searchesUsed >= searchesLimit
            ? 'bg-red-500/10 border-red-500/20'
            : 'bg-surface border-border'
        }`}>
          {searchesUsed >= searchesLimit ? (
            <AlertCircle size={16} className="text-red-400 shrink-0" />
          ) : (
            <Flame size={16} className="text-orange-400 shrink-0" />
          )}
          <div>
            <p className={`text-sm font-medium ${searchesUsed >= searchesLimit ? 'text-red-400' : 'text-white'}`}>
              {searchesUsed}/{searchesLimit} recherches utilisées aujourd'hui
            </p>
            {searchesUsed >= searchesLimit && (
              <button onClick={() => setShowModal(true)} className="text-xs text-orange-400 hover:underline">
                Passer Premium pour des recherches illimitées →
              </button>
            )}
          </div>
          {/* Progress */}
          <div className="ml-auto w-16 bg-surface-3 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-orange-500 transition-all"
              style={{ width: `${Math.min((searchesUsed / searchesLimit) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Results */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)}
        </div>
      )}

      {!loading && searched && products.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Search size={48} className="text-gray-700 mx-auto mb-4" />
          <h3 className="text-white font-semibold text-lg mb-2">Aucun résultat pour "{query}"</h3>
          <p className="text-gray-500 text-sm">Essayez avec d'autres mots-clés ou parcourez les tendances</p>
        </motion.div>
      )}

      {!loading && products.length > 0 && (
        <>
          <p className="text-gray-400 text-sm mb-5">
            {products.length} résultat{products.length > 1 ? 's' : ''} pour "<span className="text-white">{query}</span>"
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 0.05} />
            ))}
          </div>
        </>
      )}

      {/* Empty state */}
      {!loading && !searched && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-5">
            <Search size={36} className="text-orange-400" />
          </div>
          <h3 className="text-white font-semibold text-xl mb-2">Recherchez un produit</h3>
          <p className="text-gray-400 text-sm max-w-xs mx-auto">
            Entrez un mot-clé pour trouver les produits tendance correspondants dans notre base
          </p>
        </motion.div>
      )}

      <FreemiumModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message={modalMessage}
      />
    </div>
  )
}
