import Link from 'next/link'
import { Flame } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-orange flex items-center justify-center">
                <Flame size={18} className="text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Trend<span className="text-orange-500">Drop</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Détecte les produits qui cartonnent avant tout le monde. Mis à jour toutes les 6 heures grâce à l'IA et les données AliExpress.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { href: '/tendances', label: 'Tendances' },
                { href: '/recherche', label: 'Recherche' },
                { href: '/pricing', label: 'Tarifs' },
                { href: '/dashboard', label: 'Dashboard' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Légal</h4>
            <ul className="space-y-2">
              {[
                { href: '/mentions-legales', label: 'Mentions légales' },
                { href: '/confidentialite', label: 'Confidentialité' },
                { href: '/cgu', label: 'CGU' },
                { href: '/cookies', label: 'Cookies' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TrendDrop. Tous droits réservés.
          </p>
          <p className="text-gray-600 text-xs">
            Mis à jour toutes les 6h • Données AliExpress Affiliate
          </p>
        </div>
      </div>
    </footer>
  )
}
