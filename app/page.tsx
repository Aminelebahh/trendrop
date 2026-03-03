import Link from 'next/link'
import { ArrowRight, Flame, TrendingUp, Zap, Shield, RefreshCw, ChevronDown } from 'lucide-react'
import { createSupabaseServerClient } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'

async function getHomeProducts(): Promise<Product[]> {
  try {
    const supabase = await createSupabaseServerClient()
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('trend_score', { ascending: false })
      .limit(4)
    return data ?? []
  } catch {
    return []
  }
}

const steps = [
  {
    number: '01',
    icon: RefreshCw,
    title: 'Analyse automatique',
    description: "Notre système scrute AliExpress toutes les 6h et analyse les données de ventes pour détecter les produits en train de monter.",
  },
  {
    number: '02',
    icon: TrendingUp,
    title: 'Score de tendance',
    description: "Chaque produit reçoit un score de tendance sur 100 basé sur les commandes, la croissance des ventes et la viralité sociale.",
  },
  {
    number: '03',
    icon: Zap,
    title: 'Accès immédiat',
    description: "Vous voyez les produits, leur score, leur prix et accédez directement à la page AliExpress avec nos liens affiliés.",
  },
]

const testimonials = [
  {
    name: 'Marc D.',
    role: 'Dropshipper depuis 2 ans',
    avatar: 'MD',
    text: "J'ai trouvé mon produit best-seller en utilisant TrendDrop. Il avait un score de 92/100 et en 2 semaines j'avais déjà 40 commandes.",
    rating: 5,
  },
  {
    name: 'Sarah L.',
    role: 'E-commerçante indépendante',
    avatar: 'SL',
    text: "Avant TrendDrop je passais des heures à chercher des produits sur AliExpress. Maintenant j'ai les tendances fraîches chaque matin.",
    rating: 5,
  },
  {
    name: 'Thomas R.',
    role: 'Agence dropshipping',
    avatar: 'TR',
    text: "On utilise TrendDrop pour tous nos clients. Le ratio qualité/prix est imbattable. 9,99€/mois pour des centaines d'heures économisées.",
    rating: 5,
  },
]

const faqs = [
  {
    q: "Comment sont détectés les produits tendance ?",
    a: "Notre algorithme analyse les données de vente AliExpress (commandes, croissance, avis) et croise avec des signaux de viralité sociale pour calculer un score de tendance sur 100.",
  },
  {
    q: "À quelle fréquence les tendances sont-elles mises à jour ?",
    a: "Les données sont rafraîchies automatiquement toutes les 6 heures via notre système de cron jobs, vous donnant toujours les informations les plus récentes.",
  },
  {
    q: "Est-ce que je peux annuler mon abonnement ?",
    a: "Oui, sans engagement. Vous pouvez annuler à tout moment depuis votre dashboard. Vous gardez l'accès jusqu'à la fin de la période payée.",
  },
  {
    q: "Les liens AliExpress sont-ils des liens affiliés ?",
    a: "Oui, quand possible nous utilisons l'API Affiliée AliExpress. Cela ne change pas le prix pour vous — le partenariat nous permet de maintenir le service.",
  },
  {
    q: "Puis-je tester avant de m'abonner ?",
    a: "Absolument ! Le plan gratuit vous donne accès à 3 produits tendance et 3 recherches par jour, sans carte bancaire.",
  },
]

export default async function HomePage() {
  const products = await getHomeProducts()

  return (
    <div className="overflow-hidden">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-hero">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-8">
            <Flame size={14} className="text-orange-400 animate-pulse" />
            <span className="text-orange-400 text-sm font-medium">Mis à jour il y a 2h · 847 produits analysés</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display text-white leading-tight mb-6">
            Trouve les produits qui{' '}
            <span className="gradient-text">cartonnent</span>
            <br />
            AVANT tout le monde
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            TrendDrop analyse AliExpress en temps réel et détecte les produits en train de monter — avec un score de tendance, les stats de vente et un lien direct.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-orange-lg hover:shadow-orange hover:scale-105 active:scale-100"
            >
              <Zap size={20} />
              Commencer gratuitement
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/tendances"
              className="inline-flex items-center justify-center gap-2 bg-surface border border-border hover:border-orange-500/30 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all hover:bg-surface-2"
            >
              Voir les tendances
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: '10k+', label: 'Produits analysés' },
              { value: '6h', label: 'Fréquence de maj' },
              { value: '100', label: 'Score de tendance' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold font-display text-white">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} className="text-gray-600" />
        </div>
      </section>

      {/* ── Preview Products ──────────────────────────────── */}
      {products.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
                Tendances du moment 🔥
              </h2>
              <p className="text-gray-400">Les produits avec les meilleurs scores en ce moment</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} blurred={i >= 1} delay={i * 0.1} />
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/tendances"
                className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold transition-colors"
              >
                Voir toutes les tendances <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── How it works ──────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
              Comment ça marche
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Un système automatisé qui travaille pour vous 24h/24 et 7j/7
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-orange-500/30 to-transparent z-0" />
                )}
                <div className="relative z-10 p-6 bg-surface-2 border border-border rounded-2xl hover:border-orange-500/30 transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-4xl font-bold font-display text-orange-500/20">{step.number}</span>
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                      <step.icon size={20} className="text-orange-400" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold font-display text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
              Ce que disent nos utilisateurs
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-surface border border-border rounded-2xl p-6 hover:border-orange-500/20 transition-colors">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-orange-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group bg-surface-2 border border-border rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-surface-3 transition-colors">
                  <span className="text-white font-medium pr-4">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className="text-gray-400 shrink-0 group-open:rotate-180 transition-transform duration-200"
                  />
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ─────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-orange-500/10 to-surface border border-orange-500/20 rounded-3xl p-12 shadow-orange">
            <Flame size={48} className="text-orange-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold font-display text-white mb-4">
              Prêt à trouver votre prochain best-seller ?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Rejoignez des centaines de dropshippers qui utilisent TrendDrop pour garder une longueur d'avance.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg px-10 py-4 rounded-xl transition-all shadow-orange-lg"
            >
              <Zap size={20} />
              Commencer gratuitement — 0€
            </Link>
            <p className="text-gray-600 text-sm mt-4">Sans carte bancaire • Accès immédiat</p>
          </div>
        </div>
      </section>
    </div>
  )
}
