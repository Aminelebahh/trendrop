'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Flame, Eye, EyeOff, Chrome, Check } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      setLoading(false)
      return
    }

    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  const handleGoogleSignup = async () => {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero px-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-green-400" />
          </div>
          <h1 className="text-2xl font-bold font-display text-white mb-3">Vérifiez vos emails !</h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Un lien de confirmation a été envoyé à <span className="text-white font-medium">{email}</span>. Cliquez dessus pour activer votre compte.
          </p>
          <Link href="/login" className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors">
            ← Retour à la connexion
          </Link>
        </div>
      </div>
    )
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
          <h1 className="text-2xl font-bold font-display text-white mb-1">Créer un compte</h1>
          <p className="text-gray-400 text-sm mb-6">Gratuit · Sans carte bancaire</p>

          {/* Free features reminder */}
          <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-3 mb-5">
            <p className="text-orange-400 text-xs font-medium mb-2">Inclus dans le plan gratuit :</p>
            <ul className="space-y-1">
              {['3 produits tendance par jour', '3 recherches par jour', 'Liens AliExpress directs'].map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
                  <Check size={10} className="text-green-400" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="vous@exemple.fr"
                className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="Au moins 8 caractères"
                  className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 pr-11 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all shadow-orange disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Création...
                </span>
              ) : (
                'Créer mon compte gratuitement'
              )}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-600">
              <span className="bg-surface px-3">ou</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 bg-surface-2 border border-border hover:border-gray-500 text-white py-3 rounded-xl transition-colors text-sm font-medium"
          >
            <Chrome size={18} />
            Continuer avec Google
          </button>

          <p className="text-center text-gray-500 text-xs mt-5 leading-relaxed">
            En vous inscrivant, vous acceptez nos{' '}
            <Link href="/cgu" className="text-orange-400 hover:underline">CGU</Link> et notre{' '}
            <Link href="/confidentialite" className="text-orange-400 hover:underline">politique de confidentialité</Link>.
          </p>

          <p className="text-center text-gray-500 text-sm mt-4">
            Déjà un compte ?{' '}
            <Link href="/login" className="text-orange-400 hover:text-orange-300 font-medium transition-colors">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
