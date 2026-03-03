import crypto from 'crypto'
import { Product } from '@/types'

const APP_KEY = process.env.ALIEXPRESS_APP_KEY!
const APP_SECRET = process.env.ALIEXPRESS_APP_SECRET!
const TRACKING_ID = process.env.ALIEXPRESS_TRACKING_ID!
const API_URL = 'https://api-sg.aliexpress.com/sync'

// ─── AliExpress Affiliate API Signature ───────────────────────────────────────
function generateSignature(params: Record<string, string>): string {
  const sortedKeys = Object.keys(params).sort()
  const signStr = sortedKeys.map((k) => `${k}${params[k]}`).join('')
  const fullStr = APP_SECRET + signStr + APP_SECRET
  return crypto.createHash('md5').update(fullStr).digest('hex').toUpperCase()
}

async function callAliexpressAPI(method: string, extraParams: Record<string, string> = {}) {
  const timestamp = Date.now().toString()
  const params: Record<string, string> = {
    method,
    app_key: APP_KEY,
    timestamp,
    sign_method: 'md5',
    format: 'json',
    v: '2.0',
    ...extraParams,
  }
  params.sign = generateSignature(params)

  const url = new URL(API_URL)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`AliExpress API error: ${res.status}`)
  return res.json()
}

// ─── Fetch Hot Products ────────────────────────────────────────────────────────
export async function fetchHotProducts(categoryId?: string, page = 1, pageSize = 50) {
  try {
    const params: Record<string, string> = {
      tracking_id: TRACKING_ID,
      page_no: String(page),
      page_size: String(pageSize),
      sort: 'LAST_VOLUME_DESC',
    }
    if (categoryId) params.category_ids = categoryId

    const data = await callAliexpressAPI('aliexpress.affiliate.hotproduct.query', params)
    const products = data?.aliexpress_affiliate_hotproduct_query_response?.resp_result?.result?.products?.product ?? []
    return products
  } catch (error) {
    console.error('Error fetching hot products from AliExpress:', error)
    return []
  }
}

// ─── Trend Score Calculation ───────────────────────────────────────────────────
export function calculateTrendScore(product: {
  thirty_day_volume?: number
  six_month_volume?: number
  evaluate_rate?: string
  sale_price?: string
}): number {
  const orders30d = product.thirty_day_volume ?? 0
  const orders6m = product.six_month_volume ?? 0
  const reviewRate = parseFloat(product.evaluate_rate ?? '0') / 100

  // Orders score (40%) — cap at 10,000 orders for 100%
  const ordersScore = Math.min(orders30d / 10000, 1) * 40

  // Growth score (30%) — compare 30d vs average monthly over 6m
  const avgMonthly = orders6m / 6
  const growthRate = avgMonthly > 0 ? orders30d / avgMonthly : 1
  const growthScore = Math.min(growthRate / 3, 1) * 30

  // Review score (15%)
  const reviewScore = reviewRate * 15

  // Base virality score (15%) — placeholder; could integrate Google Trends
  const viralityScore = Math.random() * 10 + 5

  const total = Math.round(ordersScore + growthScore + reviewScore + viralityScore)
  return Math.min(Math.max(total, 10), 100)
}

// ─── Determine Badge ───────────────────────────────────────────────────────────
export function determineBadge(product: {
  thirty_day_volume?: number
  six_month_volume?: number
  created_at?: string
}): 'new' | 'rising' | 'viral' | null {
  const orders30d = product.thirty_day_volume ?? 0
  const orders6m = product.six_month_volume ?? 0
  const avgMonthly = orders6m / 6

  if (orders30d > 5000) return 'viral'
  if (avgMonthly > 0 && orders30d / avgMonthly > 2) return 'rising'

  const createdAt = product.created_at ? new Date(product.created_at) : null
  if (createdAt) {
    const daysSinceCreation = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
    if (daysSinceCreation < 7) return 'new'
  }

  return null
}

// ─── Map AliExpress product to DB shape ───────────────────────────────────────
export function mapAliexpressProduct(raw: Record<string, unknown>): Omit<Product, 'id' | 'created_at' | 'updated_at'> {
  const aliexpressId = String(raw.product_id ?? raw.productId ?? '')
  const trendScore = calculateTrendScore({
    thirty_day_volume: Number(raw.thirty_day_volume ?? 0),
    six_month_volume: Number(raw.six_month_volume ?? 0),
    evaluate_rate: String(raw.evaluate_rate ?? '0'),
  })

  const priceStr = String(raw.target_sale_price ?? raw.sale_price ?? '0')
  const priceEur = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0

  return {
    aliexpress_id: aliexpressId,
    name: String(raw.product_title ?? raw.productTitle ?? 'Produit AliExpress'),
    image_url: String(raw.product_main_image_url ?? raw.imageUrl ?? ''),
    price_eur: priceEur,
    category: String(raw.first_level_category_name ?? 'Divers'),
    trend_score: trendScore,
    orders_count: Number(raw.thirty_day_volume ?? 0),
    aliexpress_url: String(raw.product_detail_url ?? `https://www.aliexpress.com/item/${aliexpressId}.html`),
    affiliate_url: String(raw.promotion_link ?? raw.promotionLink ?? ''),
    badge: determineBadge({ thirty_day_volume: Number(raw.thirty_day_volume ?? 0), six_month_volume: Number(raw.six_month_volume ?? 0) }),
    is_active: true,
  }
}

// ─── Category IDs ─────────────────────────────────────────────────────────────
export const ALIEXPRESS_CATEGORIES: Record<string, string> = {
  'Mode': '200000345',
  'High-Tech': '200000606',
  'Maison': '200000234',
  'Beauté': '200003655',
  'Sport': '200000488',
  'Enfants': '200000147',
  'Bijoux': '200000812',
}
