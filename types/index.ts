export type Product = {
  id: string
  aliexpress_id: string
  name: string
  image_url: string
  price_eur: number
  category: string
  trend_score: number
  orders_count: number
  aliexpress_url: string
  affiliate_url: string | null
  badge: 'new' | 'rising' | 'viral' | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export type Profile = {
  id: string
  email: string
  is_premium: boolean
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_ends_at: string | null
  daily_searches_count: number
  daily_searches_reset_at: string | null
  created_at: string
}

export type Favorite = {
  id: string
  user_id: string
  product_id: string
  created_at: string
  product?: Product
}

export type TrendUpdate = {
  id: string
  products_fetched: number
  products_updated: number
  ran_at: string
}

export type FreemiumStatus = {
  is_premium: boolean
  searches_used: number
  searches_limit: number
  limited: boolean
  message?: string
}
