'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Flame, ArrowLeft, Check } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      setError("Une erreur s'est produite. Vérifiez l'adresse email.")
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-orange flex items-center justify-center">
              <Flame size={22} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white">
              Trend<span className="text-orange-500">Drop</span>
            </span>
          </Link>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8 shadow-2xl">
          {sent ? (
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                <Check size={28} className="text-green-400" />
              </div>
              <h2 className="text-xl font-bold font-display text-white mb-2">Email envoyé !</h2>
              <p className="text-gray-400 text-sm mb-6">
                Vérifiez votre boîte mail pour réinitialiser votre mot de passe.
              </p>
              <Link href="/login" className="text-orange-400 hover:text-orange-300 text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                <ArrowLeft size={14} /> Retour à la connexion
              </Link>
            </div>
          ) : (
            <>
              <Link href="/login" className="flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm mb-6 transition-colors w-fit">
                <ArrowLeft size={14} /> Retour
              </Link>
              <h1 className="text-2xl font-bold font-display text-white mb-2">Mot de passe oublié</h1>
              <p className="text-gray-400 text-sm mb-6">Entrez votre email pour recevoir un lien de réinitialisation.</p>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-4 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="vous@exemple.fr"
                  className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 rounded-xl transition-all shadow-orange disabled:opacity-60"
                >
                  {loading ? 'Envoi...' : 'Envoyer le lien'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
