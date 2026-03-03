'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Check, Flame } from 'lucide-react'
import PricingSection from '@/components/PricingSection'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

function PricingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const canceled = searchParams.get('canceled')

  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      setUserId(user.id)
      const { data } = await supabase.from('profiles').select('is_premium').eq('id', user.id).single()
      setIsPremium(data?.is_premium ?? false)
    })
  }, [])

  const handleSubscribe = async () => {
    if (!userId) {
      router.push('/signup')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
          <Flame size={14} className="text-orange-400" />
          <span className="text-orange-400 text-sm font-medium">Simple et transparent</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold font-display text-white mb-4">
          Choisissez votre plan
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Commencez gratuitement. Passez Premium quand vous êtes prêt à scaler.
        </p>
      </div>

      {canceled && (
        <div className="max-w-md mx-auto mb-8 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-center text-yellow-400 text-sm">
          Paiement annulé. Aucun montant n'a été débité.
        </div>
      )}

      {isPremium && (
        <div className="max-w-md mx-auto mb-8 bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center gap-3 text-green-400 text-sm">
          <Check size={16} />
          Vous êtes déjà abonné à TrendDrop Premium ! Gérez votre abonnement depuis le dashboard.
        </div>
      )}

      <PricingSection onSubscribe={handleSubscribe} loading={loading} />

      {/* Trust signals */}
      <div className="mt-16 text-center">
        <p className="text-gray-500 text-sm mb-6">Ils nous font confiance</p>
        <div className="flex items-center justify-center gap-8 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-400">🔒</span>
            Paiement sécurisé Stripe
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-400">📅</span>
            Sans engagement
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">💌</span>
            Support prioritaire
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="text-gray-400">Chargement...</span></div>}>
      <PricingContent />
    </Suspense>
  )
}
