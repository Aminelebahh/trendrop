import { Resend } from 'resend'
import { Product } from '@/types'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@trenddrop.fr'

export async function sendWelcomeEmail(email: string, name?: string) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: 'Bienvenue sur TrendDrop ! 🔥',
    html: `
      <div style="font-family: 'DM Sans', sans-serif; background: #0a0a0a; color: #ffffff; padding: 40px; max-width: 600px; margin: 0 auto; border-radius: 12px;">
        <h1 style="color: #f97316; font-size: 28px; margin-bottom: 8px;">Bienvenue sur TrendDrop !</h1>
        <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6;">
          Bonjour ${name ?? 'cher dropshipper'},<br><br>
          Tu es maintenant inscrit(e) sur <strong style="color: #f97316;">TrendDrop</strong> — le radar des produits qui cartonnent avant tout le monde.
        </p>
        <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <h3 style="color: #ffffff; margin: 0 0 12px;">Avec ton accès gratuit, tu peux :</h3>
          <ul style="color: #a3a3a3; line-height: 2;">
            <li>Voir les 3 premiers produits tendance du jour</li>
            <li>Effectuer 3 recherches par jour</li>
            <li>Accéder aux liens directs AliExpress</li>
          </ul>
        </div>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/tendances" style="display: inline-block; background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px;">
          Voir les tendances →
        </a>
        <p style="color: #555; font-size: 12px; margin-top: 40px;">
          Tu reçois cet email car tu t'es inscrit sur trenddrop.fr. <a href="{{unsubscribe}}" style="color: #f97316;">Se désinscrire</a>
        </p>
      </div>
    `,
  })
}

export async function sendPaymentConfirmationEmail(email: string) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: 'Paiement confirmé — TrendDrop Premium actif ! 🚀',
    html: `
      <div style="font-family: 'DM Sans', sans-serif; background: #0a0a0a; color: #ffffff; padding: 40px; max-width: 600px; margin: 0 auto; border-radius: 12px;">
        <h1 style="color: #f97316; font-size: 28px;">Premium activé ✅</h1>
        <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6;">
          Ton abonnement TrendDrop Premium est maintenant actif. Tu as accès à tous les produits tendance, recherches illimitées et filtres avancés.
        </p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display: inline-block; background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px;">
          Accéder au Dashboard →
        </a>
      </div>
    `,
  })
}

export async function sendWeeklyTrendsEmail(email: string, products: Product[]) {
  const productCards = products.slice(0, 10).map((p) => `
    <div style="background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; padding: 16px; margin-bottom: 12px; display: flex; align-items: center; gap: 16px;">
      <img src="${p.image_url}" alt="${p.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 6px;" />
      <div>
        <p style="color: #ffffff; font-weight: 600; margin: 0 0 4px;">${p.name}</p>
        <p style="color: #f97316; margin: 0 0 4px;">🔥 Score : ${p.trend_score}/100</p>
        <p style="color: #a3a3a3; margin: 0 0 8px;">${p.price_eur.toFixed(2)} €</p>
        <a href="${p.affiliate_url || p.aliexpress_url}" style="color: #f97316; font-size: 14px;">Voir sur AliExpress →</a>
      </div>
    </div>
  `).join('')

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: '🔥 Top 10 tendances de la semaine — TrendDrop',
    html: `
      <div style="font-family: 'DM Sans', sans-serif; background: #0a0a0a; color: #ffffff; padding: 40px; max-width: 600px; margin: 0 auto; border-radius: 12px;">
        <h1 style="color: #f97316; font-size: 24px;">Top 10 Tendances cette semaine</h1>
        <p style="color: #a3a3a3;">Les produits les plus chauds à ajouter à ta boutique :</p>
        ${productCards}
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/tendances" style="display: inline-block; background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; margin-top: 16px;">
          Voir toutes les tendances →
        </a>
        <p style="color: #555; font-size: 12px; margin-top: 40px;">
          <a href="{{unsubscribe}}" style="color: #f97316;">Se désinscrire des alertes</a>
        </p>
      </div>
    `,
  })
}

export async function sendPaymentFailedEmail(email: string) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: 'Action requise — Échec de paiement TrendDrop',
    html: `
      <div style="font-family: 'DM Sans', sans-serif; background: #0a0a0a; color: #ffffff; padding: 40px; max-width: 600px; margin: 0 auto; border-radius: 12px;">
        <h1 style="color: #ef4444; font-size: 24px;">Paiement échoué ⚠️</h1>
        <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6;">
          Nous n'avons pas pu traiter ton paiement mensuel. Pour continuer à accéder à TrendDrop Premium, mets à jour ton moyen de paiement.
        </p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display: inline-block; background: #ef4444; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 700;">
          Mettre à jour le paiement →
        </a>
      </div>
    `,
  })
}
