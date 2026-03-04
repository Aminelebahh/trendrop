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
    aliexpress_id: 'MOCK001',
    name: 'Montre connectée Sport Pro — Suivi santé 24/7, GPS intégré',
    image_url: 'https://picsum.photos/seed/watch/400/400',
    price_eur: 22.99,
    category: 'High-Tech',
    trend_score: 96,
    orders_count: 8432,
    aliexpress_url: 'https://www.aliexpress.com/wholesale?SearchText=smartwatch+sport+pro',
    affiliate_url: null,
    badge: 'viral',
    is_active: true,
  },
  {
    aliexpress_id: 'MOCK002',
    name: 'Lampe LED Aurora Borealis — Projecteur ambiance nordique',
    image_url: 'https://picsum.photos/seed/lamp/400/400',
    price_eur: 14.5,
    category: 'Maison',
    trend_score: 91,
    orders_count: 6201,
    aliexpress_url: 'https://www.aliexpress.com/wholesale?SearchText=aurora+borealis+projector+led',
    affiliate_url: null,
    badge: 'viral',
    is_active: true,
  },
  {
    aliexpress_id: 'MOCK003',
    name: 'Écouteurs sans fil ANC — Réduction de bruit active 40h batterie',
    image_url: 'https://picsum.photos/seed/headphones/400/400',
    price_eur: 18.99,
    category: 'High-Tech',
    trend_score: 89,
    orders_count: 12843,
    aliexpress_url: 'https://www.aliexpress.com/wholesale?SearchText=wireless+earbuds+anc+40h',
    affiliate_url: null,
    badge: 'rising',
    is_active: true,
  },
  {
    aliexpress_id: 'MOCK004',
    name: 'Sérum visage Vitamine C — Anti-âge 30ml formule concentrée',
    image_url: 'https://picsum.photos/seed/serum/400/400',
    price_eur: 8.99,
    category: 'Beauté',
    trend_score: 87,
    orders_count: 9521,
    aliexpress_url: 'https://www.aliexpress.com/wholesale?SearchText=vitamin+c+serum+face+antiaging',
    affiliate_url: null,
    badge: 'rising',
    is_active: true,
  },
  {
    aliexpress_id: 'MOCK005',
    name: 'Mini Drone caméra 4K — Stabilisation gyro, portée 500m',
    image_url: 'https://picsum.photos/seed/drone/400/400',
    price_eur: 45.99,
    category: 'High-Tech',
    trend_score: 85,
    orders_count: 3201,
    aliexpress_url: 'https://www.aliexpress.com/wholesale?SearchText=mini+drone+4k+camera+gyro',
    affiliate_url: null,
    badge: 'new',
    is_active: true,
  },
  {
    aliexpress_id: 'MOCK006',
    name: 'Tapis de yoga antidérapant — 6mm épaisseur, sangle transport',
    image_url: 'https://picsum.photos/seed/yoga/400/400',
    price_eur: 12.5,
    category: 'Sport',
    trend_score: 83,
    orders_count: 7845,
    aliexpress_url: 'https://www.aliexpress.com/wholesale?SearchText=yoga+mat+nonslip+6mm',
    affiliate_url: null,
    badge: 'rising',
    is_active: true,
  },
  {
    aliexpress_id: 'MOCK007',
    name: 'Organisateur câbles bureau — Pack 50 attaches velcro colorées',
    image_url: 'https://picsum.photos/seed/cables/400/400',
    price_eur: 4.99,
    category: 'Maison',
    trend_score: 80,
    orders_count: 23412,
    aliexpress_url: 'https://www.aliexpress.com/wholesale?SearchText=cable+organizer+velcro+ties',
    affiliate_url: null,
    badge: 'viral',
    is_active: true,
  },
  {
    aliexpress_id: 'MOCK008',
    name: 'Lampe UV gel ongles — Set nail art professionnel 36W',
    image_url: 'https://picsum.photos/seed/nails/400/400',
    price_eur: 16.99,
    category: 'Beauté',
    trend_score: 78,
    orders_count: 5103,
    aliexpress_url: 'https://www.aliexpress.com/wholesale?SearchText=uv+gel+nail+lamp+36w',
    affiliate_url: null,
    badge: 'rising',
    is_active: true,
  },
  {
    aliexpress_id: 'MOCK009',
    name: 'Veste imperméable randonnée — Coupe-vent 4 saisons unisexe',
    image_url: 'https://picsum.photos/seed/jacket/400/400',
    price_eur: 34.99,
    category: 'Mode',
    trend_score: 76,
    orders_count: 4302,
    aliexpress_url: 'https://www.aliexpress.com/wholesale?SearchText=waterproof+hiking+jacket+windbreaker',
    affiliate_url: null,
    badge: null,
    is_active: true,
  },
  {
    aliexpress_id: 'MOCK010',
    name: 'Jouet interactif chat — Laser automatique rotatif USB',
    image_url: 'https://picsum.photos/seed/cat/400/400',
    price_eur: 9.99,
    category: 'Enfants',
    trend_score: 74,
    orders_count: 11203,
    aliexpress_url: 'https://www.aliexpress.com/wholesale?SearchText=automatic+laser+cat+toy+usb',
    affiliate_url: null,
    badge: 'new',
    is_active: true,
  },
  {
    aliexpress_id: 'MOCK011',
    name: 'Collier acier inoxydable minimaliste — Pendentif lune femme',
    image_url: 'https://picsum.photos/seed/necklace/400/400',
    price_eur: 6.5,
    category: 'Bijoux',
    trend_score: 72,
    orders_count: 15600,
    aliexpress_url: 'https://www.aliexpress.com/wholesale?SearchText=stainless+steel+moon+necklace+women',
    affiliate_url: null,
    badge: null,
    is_active: true,
  },
  {
    aliexpress_id: 'MOCK012',
    name: 'Station de recharge sans fil 3-en-1 — iPhone, Apple Watch, AirPods',
    image_url: 'https://picsum.photos/seed/charger/400/400',
    price_eur: 19.99,
    category: 'High-Tech',
    trend_score: 70,
    orders_count: 8901,
    aliexpress_url: 'https://www.aliexpress.com/wholesale?SearchText=wireless+charger+3in1+iphone+watch',
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
