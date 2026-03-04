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
    aliexpress_id: '1005005804746693',
    name: 'Montre connectée COLMI P71 — Appels, santé 24/7, 140+ sports',
    image_url: 'https://ae01.alicdn.com/kf/Sbf1271f4607a461f8bb1ef30d12fe12f1.jpg',
    price_eur: 22.99,
    category: 'High-Tech',
    trend_score: 96,
    orders_count: 8432,
    aliexpress_url: 'https://www.aliexpress.com/item/1005005804746693.html',
    affiliate_url: null,
    badge: 'viral',
    is_active: true,
  },
  {
    aliexpress_id: '1005003512522799',
    name: 'Projecteur Aurora Galaxy LED — Enceinte Bluetooth, bruit blanc',
    image_url: 'https://ae01.alicdn.com/kf/S0c8948ca09fb4e3eb8e194b14f5240ffj.png',
    price_eur: 14.5,
    category: 'Maison',
    trend_score: 91,
    orders_count: 6201,
    aliexpress_url: 'https://www.aliexpress.com/item/1005003512522799.html',
    affiliate_url: null,
    badge: 'viral',
    is_active: true,
  },
  {
    aliexpress_id: '1005005222129894',
    name: 'Écouteurs QCY T13 ANC — Bluetooth 5.3, réduction bruit 28dB',
    image_url: 'https://ae01.alicdn.com/kf/S37a9a8a4bc8549b5bde776cb65fb7b95k.jpg',
    price_eur: 18.99,
    category: 'High-Tech',
    trend_score: 89,
    orders_count: 12843,
    aliexpress_url: 'https://www.aliexpress.com/item/1005005222129894.html',
    affiliate_url: null,
    badge: 'rising',
    is_active: true,
  },
  {
    aliexpress_id: '32897215036',
    name: 'Sérum Vitamine C LANBENA — Anti-taches, éclat du teint 15ml',
    image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
    price_eur: 8.99,
    category: 'Beauté',
    trend_score: 87,
    orders_count: 9521,
    aliexpress_url: 'https://www.aliexpress.com/item/32897215036.html',
    affiliate_url: null,
    badge: 'rising',
    is_active: true,
  },
  {
    aliexpress_id: '1005001470621722',
    name: 'Mini Drone caméra 4K — WiFi FPV, pliable, maintien altitude',
    image_url: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop',
    price_eur: 45.99,
    category: 'High-Tech',
    trend_score: 85,
    orders_count: 3201,
    aliexpress_url: 'https://www.aliexpress.com/item/1005001470621722.html',
    affiliate_url: null,
    badge: 'new',
    is_active: true,
  },
  {
    aliexpress_id: '32982062929',
    name: 'Tapis de yoga PU naturel — Antidérapant, éco-responsable',
    image_url: 'https://images.unsplash.com/photo-1601925228008-8cf9c85cfbdb?w=400&h=400&fit=crop',
    price_eur: 12.5,
    category: 'Sport',
    trend_score: 83,
    orders_count: 7845,
    aliexpress_url: 'https://www.aliexpress.com/item/32982062929.html',
    affiliate_url: null,
    badge: 'rising',
    is_active: true,
  },
  {
    aliexpress_id: '1005003667667303',
    name: 'Organisateur câbles velcro — 16 attaches réutilisables bureau',
    image_url: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop',
    price_eur: 4.99,
    category: 'Maison',
    trend_score: 80,
    orders_count: 23412,
    aliexpress_url: 'https://www.aliexpress.com/item/1005003667667303.html',
    affiliate_url: null,
    badge: 'viral',
    is_active: true,
  },
  {
    aliexpress_id: '32926087433',
    name: 'Lampe UV gel ongles LKE 36W — 12 LEDs, timer 30/60/90s',
    image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop',
    price_eur: 16.99,
    category: 'Beauté',
    trend_score: 78,
    orders_count: 5103,
    aliexpress_url: 'https://www.aliexpress.com/item/32926087433.html',
    affiliate_url: null,
    badge: 'rising',
    is_active: true,
  },
  {
    aliexpress_id: '1005001859938033',
    name: 'Veste imperméable randonnée — Légère, capuche, packable',
    image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac6?w=400&h=400&fit=crop',
    price_eur: 34.99,
    category: 'Mode',
    trend_score: 76,
    orders_count: 4302,
    aliexpress_url: 'https://www.aliexpress.com/item/1005001859938033.html',
    affiliate_url: null,
    badge: null,
    is_active: true,
  },
  {
    aliexpress_id: '33036295563',
    name: 'Jouet laser chat 3-en-1 — Automatique, diamant, interactif',
    image_url: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=400&fit=crop',
    price_eur: 9.99,
    category: 'Enfants',
    trend_score: 74,
    orders_count: 11203,
    aliexpress_url: 'https://www.aliexpress.com/item/33036295563.html',
    affiliate_url: null,
    badge: 'new',
    is_active: true,
  },
  {
    aliexpress_id: '33000111783',
    name: 'Collier lune étoile — Acier inoxydable, coquillage naturel',
    image_url: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400&h=400&fit=crop',
    price_eur: 6.5,
    category: 'Bijoux',
    trend_score: 72,
    orders_count: 15600,
    aliexpress_url: 'https://www.aliexpress.com/item/33000111783.html',
    affiliate_url: null,
    badge: null,
    is_active: true,
  },
  {
    aliexpress_id: '1005002623215039',
    name: 'Chargeur sans fil 3-en-1 — iPhone + Apple Watch + AirPods rapide',
    image_url: 'https://ae01.alicdn.com/kf/Sa5cf769580a341eba0756c0ac67cda23Q.jpg',
    price_eur: 19.99,
    category: 'High-Tech',
    trend_score: 70,
    orders_count: 8901,
    aliexpress_url: 'https://www.aliexpress.com/item/1005002623215039.html',
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
