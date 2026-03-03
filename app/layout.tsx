import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'TrendDrop — Détectez les produits tendance pour le dropshipping',
    template: '%s | TrendDrop',
  },
  description:
    'Trouvez les produits qui cartonnent AVANT tout le monde. TrendDrop analyse les données AliExpress en temps réel pour vous donner les meilleures opportunités de dropshipping.',
  keywords: ['dropshipping', 'produits tendance', 'aliexpress', 'ecommerce', 'trend', 'bestseller'],
  openGraph: {
    title: 'TrendDrop — Détectez les produits tendance',
    description: 'Analyse automatique des produits tendance AliExpress. Mise à jour toutes les 6h.',
    url: 'https://trenddrop.fr',
    siteName: 'TrendDrop',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrendDrop — Détectez les produits tendance',
    description: 'Analyse automatique des produits tendance AliExpress.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-background text-white font-body antialiased">
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
