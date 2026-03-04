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
    aliexpress_id: '1005005865273867',
    name: 'Montre connectée Sport Pro — Suivi santé 24/7, GPS intégré',
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    price_eur: 22.99,
    category: 'High-Tech',
    trend_score: 96,
    orders_count: 8432,
    aliexpress_url: 'https://www.aliexpress.com/item/1005005865273867.html',
    affiliate_url: null,
    badge: 'viral',
    is_active: true,
  },
  {
    aliexpress_id: '1005006171861151',
    name: 'Lampe LED Aurora Borealis — Projecteur ambiance nordique',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    price_eur: 14.5,
    category: 'Maison',
    trend_score: 91,
    orders_count: 6201,
    aliexpress_url: 'https://www.aliexpress.com/item/1005006171861151.html',
    affiliate_url: null,
    badge: 'viral',
    is_active: true,
  },
  {
    aliexpress_id: '1005005932895619',
    name: 'Écouteurs sans fil ANC — Réduction de bruit active 40h batterie',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    price_eur: 18.99,
    category: 'High-Tech',
    trend_score: 89,
    orders_count: 12843,
    aliexpress_url: 'https://www.aliexpress.com/item/1005005932895619.html',
    affiliate_url: null,
    badge: 'rising',
    is_active: true,
  },
  {
    aliexpress_id: '1005004930578136',
    name: 'Sérum visage Vitamine C — Anti-âge 30ml formule concentrée',
    image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
    price_eur: 8.99,
    category: 'Beauté',
    trend_score: 87,
    orders_count: 9521,
    aliexpress_url: 'https://www.aliexpress.com/item/1005004930578136.html',
    affiliate_url: null,
    badge: 'rising',
    is_active: true,
  },
  {
    aliexpress_id: '1005005956614764',
    name: 'Mini Drone caméra 4K — Stabilisation gyro, portée 500m',
    image_url: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop',
    price_eur: 45.99,
    category: 'High-Tech',
    trend_score: 85,
    orders_count: 3201,
    aliexpress_url: 'https://www.aliexpress.com/item/1005005956614764.html',
    affiliate_url: null,
    badge: 'new',
    is_active: true,
  },
  {
    aliexpress_id: '1005003995536863',
    name: 'Tapis de yoga antidérapant — 6mm épaisseur, sangle transport',
    image_url: 'https://images.unsplash.com/photo-1601925228008-8cf9c85cfbdb?w=400&h=400&fit=crop',
    price_eur: 12.5,
    category: 'Sport',
    trend_score: 83,
    orders_count: 7845,
    aliexpress_url: 'https://www.aliexpress.com/item/1005003995536863.html',
    affiliate_url: null,
    badge: 'rising',
    is_active: true,
  },
  {
    aliexpress_id: '1005005706174552',
    name: 'Organisateur câbles bureau — Pack 50 attaches velcro colorées',
    image_url: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop',
    price_eur: 4.99,
    category: 'Maison',
    trend_score: 80,
    orders_count: 23412,
    aliexpress_url: 'https://www.aliexpress.com/item/1005005706174552.html',
    affiliate_url: null,
    badge: 'viral',
    is_active: true,
  },
  {
    aliexpress_id: '1005004455995543',
    name: 'Lampe UV gel ongles — Set nail art professionnel 36W',
    image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop',
    price_eur: 16.99,
    category: 'Beauté',
    trend_score: 78,
    orders_count: 5103,
    aliexpress_url: 'https://www.aliexpress.com/item/1005004455995543.html',
    affiliate_url: null,
    badge: 'rising',
    is_active: true,
  },
  {
    aliexpress_id: '1005005388050678',
    name: 'Veste imperméable randonnée — Coupe-vent 4 saisons unisexe',
    image_url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400&h=400&fit=crop',
    price_eur: 34.99,
    category: 'Mode',
    trend_score: 76,
    orders_count: 4302,
    aliexpress_url: 'https://www.aliexpress.com/item/1005005388050678.html',
    affiliate_url: null,
    badge: null,
    is_active: true,
  },
  {
    aliexpress_id: '1005005612804509',
    name: 'Jouet interactif chat — Laser automatique rotatif USB',
    image_url: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=400&fit=crop',
    price_eur: 9.99,
    category: 'Enfants',
    trend_score: 74,
    orders_count: 11203,
    aliexpress_url: 'https://www.aliexpress.com/item/1005005612804509.html',
    affiliate_url: null,
    badge: 'new',
    is_active: true,
  },
  {
    aliexpress_id: '1005004786462952',
    name: 'Collier acier inoxydable minimaliste — Pendentif lune femme',
    image_url: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&h=400&fit=crop',
    price_eur: 6.5,
    category: 'Bijoux',
    trend_score: 72,
    orders_count: 15600,
    aliexpress_url: 'https://www.aliexpress.com/item/1005004786462952.html',
    affiliate_url: null,
    badge: null,
    is_active: true,
  },
  {
    aliexpress_id: '1005005863689695',
    name: 'Station de recharge sans fil 3-en-1 — iPhone, Apple Watch, AirPods',
    image_url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop',
    price_eur: 19.99,
    category: 'High-Tech',
    trend_score: 70,
    orders_count: 8901,
    aliexpress_url: 'https://www.aliexpress.com/item/1005005863689695.html',
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
