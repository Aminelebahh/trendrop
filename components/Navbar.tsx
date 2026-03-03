'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Flame, Zap, LogOut, User, LayoutDashboard } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'

const navLinks = [
  { href: '/tendances', label: 'Tendances' },
  { href: '/recherche', label: 'Recherche' },
  { href: '/pricing', label: 'Tarifs' },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<{ email?: string; isPremium?: boolean } | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return setUser(null)
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_premium')
        .eq('id', user.id)
        .single()
      setUser({ email: user.email, isPremium: profile?.is_premium ?? false })
    })
  }, [pathname])

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
    router.refresh()
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-background/90 backdrop-blur-xl border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-orange flex items-center justify-center group-hover:shadow-orange transition-shadow">
              <Flame size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white">
              Trend<span className="text-orange-500">Drop</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-orange-400 bg-orange-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-surface-2'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-2 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <User size={14} className="text-orange-400" />
                  </div>
                  <span className="text-sm text-gray-300">{user.email?.split('@')[0]}</span>
                  {user.isPremium && (
                    <span className="text-xs bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded-full border border-orange-500/30 font-medium">
                      PRO
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden"
                    >
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-surface-2 hover:text-white transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard size={14} /> Dashboard
                      </Link>
                      <button
                        onClick={() => { setUserMenuOpen(false); handleSignOut() }}
                        className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-400 hover:bg-surface-2 transition-colors"
                      >
                        <LogOut size={14} /> Se déconnecter
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
                >
                  Connexion
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-orange"
                >
                  <Zap size={14} />
                  Commencer gratuitement
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface-2 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-surface-2 transition-colors font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border space-y-2">
                {user ? (
                  <>
                    <Link href="/dashboard" className="block px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-surface-2 transition-colors" onClick={() => setMenuOpen(false)}>
                      Dashboard
                    </Link>
                    <button onClick={() => { setMenuOpen(false); handleSignOut() }} className="block w-full text-left px-4 py-3 rounded-lg text-red-400 hover:bg-surface-2 transition-colors">
                      Se déconnecter
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-surface-2 transition-colors" onClick={() => setMenuOpen(false)}>
                      Connexion
                    </Link>
                    <Link href="/signup" className="block px-4 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-center" onClick={() => setMenuOpen(false)}>
                      Commencer gratuitement
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
