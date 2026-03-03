/**
 * Seed script to populate the database with mock trending products
 * Run with: npx ts-node --project tsconfig.json scripts/seed-products.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const mockProducts = [
  {
    aliexpress_id: 'AE001',
    name: 'Montre connectée Sport Pro — Suivi santé 24/7, GPS intégré',
    image_url: 'https://ae01.alicdn.com/kf/S1234567890.jpg',
    price_eur: 22.99,
    category: 'High-Tech',
    trend_score: 96,
    orders_count: 8432,
    aliexpress_url: 'https://www.aliexpress.com/item/1005006123456789.html',
    affiliate_url: null,
    badge: 'viral',
    is_active: true,
  },
  {
    aliexpress_id: 'AE002',
    name: 'Lampe LED Aurora Borealis — Projecteur ambiance nordique',
    image_url: 'https://ae01.alicdn.com/kf/S2345678901.jpg',
    price_eur: 14.5,
    category: 'Maison',
    trend_score: 91,
    orders_count: 6201,
    aliexpress_url: 'https://www.aliexpress.com/item/1005006234567890.html',
    affiliate_url: null,
    badge: 'viral',
    is_active: true,
  },
  {
    aliexpress_id: 'AE003',
    name: 'Écouteurs sans fil ANC — Réduction de bruit active 40h batterie',
    image_url: 'https://ae01.alicdn.com/kf/S3456789012.jpg',
    price_eur: 18.99,
    category: 'High-Tech',
    trend_score: 89,
    orders_count: 12843,
    aliexpress_url: 'https://www.aliexpress.com/item/1005006345678901.html',
    affiliate_url: null,
    badge: 'rising',
    is_active: true,
  },
  {
    aliexpress_id: 'AE004',
    name: 'Sérum visage Vitamine C — Anti-âge 30ml formule concentrée',
    image_url: 'https://ae01.alicdn.com/kf/S4567890123.jpg',
    price_eur: 8.99,
    category: 'Beauté',
    trend_score: 87,
    orders_count: 9521,
    aliexpress_url: 'https://www.aliexpress.com/item/1005006456789012.html',
    affiliate_url: null,
    badge: 'rising',
    is_active: true,
  },
  {
    aliexpress_id: 'AE005',
    name: 'Mini Drone caméra 4K — Stabilisation gyro, portée 500m',
    image_url: 'https://ae01.alicdn.com/kf/S5678901234.jpg',
    price_eur: 45.99,
    category: 'High-Tech',
    trend_score: 85,
    orders_count: 3201,
    aliexpress_url: 'https://www.aliexpress.com/item/1005006567890123.html',
    affiliate_url: null,
    badge: 'new',
    is_active: true,
  },
  {
    aliexpress_id: 'AE006',
    name: 'Tapis de yoga antidérapant — 6mm épaisseur, sangle transport',
    image_url: 'https://ae01.alicdn.com/kf/S6789012345.jpg',
    price_eur: 12.5,
    category: 'Sport',
    trend_score: 83,
    orders_count: 7845,
    aliexpress_url: 'https://www.aliexpress.com/item/1005006678901234.html',
    affiliate_url: null,
    badge: 'rising',
    is_active: true,
  },
  {
    aliexpress_id: 'AE007',
    name: 'Organisateur câbles bureau — Pack 50 attaches velcro colorées',
    image_url: 'https://ae01.alicdn.com/kf/S7890123456.jpg',
    price_eur: 4.99,
    category: 'Maison',
    trend_score: 80,
    orders_count: 23412,
    aliexpress_url: 'https://www.aliexpress.com/item/1005006789012345.html',
    affiliate_url: null,
    badge: 'viral',
    is_active: true,
  },
  {
    aliexpress_id: 'AE008',
    name: 'Bague LED UV gel — Set nail art professionnel 36W',
    image_url: 'https://ae01.alicdn.com/kf/S8901234567.jpg',
    price_eur: 16.99,
    category: 'Beauté',
    trend_score: 78,
    orders_count: 5103,
    aliexpress_url: 'https://www.aliexpress.com/item/1005006890123456.html',
    affiliate_url: null,
    badge: 'rising',
    is_active: true,
  },
  {
    aliexpress_id: 'AE009',
    name: 'Veste imperméable randonnée — Coupe-vent 4 saisons unisexe',
    image_url: 'https://ae01.alicdn.com/kf/S9012345678.jpg',
    price_eur: 34.99,
    category: 'Mode',
    trend_score: 76,
    orders_count: 4302,
    aliexpress_url: 'https://www.aliexpress.com/item/1005006901234567.html',
    affiliate_url: null,
    badge: null,
    is_active: true,
  },
  {
    aliexpress_id: 'AE010',
    name: 'Jouet interactif chat — Laser automatique rotatif USB',
    image_url: 'https://ae01.alicdn.com/kf/S0123456789.jpg',
    price_eur: 9.99,
    category: 'Enfants',
    trend_score: 74,
    orders_count: 11203,
    aliexpress_url: 'https://www.aliexpress.com/item/1005006012345678.html',
    affiliate_url: null,
    badge: 'new',
    is_active: true,
  },
  {
    aliexpress_id: 'AE011',
    name: 'Collier acier inoxydable minimaliste — Pendentif lune femme',
    image_url: 'https://ae01.alicdn.com/kf/S1122334455.jpg',
    price_eur: 6.5,
    category: 'Bijoux',
    trend_score: 72,
    orders_count: 15600,
    aliexpress_url: 'https://www.aliexpress.com/item/1005006112233445.html',
    affiliate_url: null,
    badge: null,
    is_active: true,
  },
  {
    aliexpress_id: 'AE012',
    name: 'Station de recharge sans fil 3-en-1 — iPhone, Apple Watch, AirPods',
    image_url: 'https://ae01.alicdn.com/kf/S2233445566.jpg',
    price_eur: 19.99,
    category: 'High-Tech',
    trend_score: 70,
    orders_count: 8901,
    aliexpress_url: 'https://www.aliexpress.com/item/1005006223344556.html',
    affiliate_url: null,
    badge: 'new',
    is_active: true,
  },
]

async function seed() {
  console.log('🌱 Seeding database with mock products...')

  const { data, error } = await supabase
    .from('products')
    .upsert(mockProducts, { onConflict: 'aliexpress_id' })
    .select()

  if (error) {
    console.error('❌ Error seeding products:', error)
    process.exit(1)
  }

  // Log the seed run
  await supabase.from('trend_updates').insert({
    products_fetched: mockProducts.length,
    products_updated: data?.length ?? 0,
  })

  console.log(`✅ Successfully seeded ${data?.length ?? 0} products!`)
  process.exit(0)
}

seed()
