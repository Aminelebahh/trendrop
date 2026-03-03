import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase'
import { Product } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const format = searchParams.get('format')
  const category = searchParams.get('category')
  const badge = searchParams.get('badge')
  const sort = searchParams.get('sort') ?? 'score_desc'
  const minScore = parseInt(searchParams.get('minScore') ?? '0')
  const minPrice = parseFloat(searchParams.get('minPrice') ?? '0')
  const maxPrice = parseFloat(searchParams.get('maxPrice') ?? '99999')
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 200)

  try {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    let isPremium = false
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_premium')
        .eq('id', user.id)
        .single()
      isPremium = profile?.is_premium ?? false
    }

    const adminSupabase = createSupabaseAdminClient()
    let query = adminSupabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .gte('trend_score', minScore)
      .gte('price_eur', minPrice)
      .lte('price_eur', maxPrice)

    if (category) query = query.eq('category', category)
    if (badge) query = query.eq('badge', badge)

    // Sort
    switch (sort) {
      case 'newest':
        query = query.order('created_at', { ascending: false })
        break
      case 'price_asc':
        query = query.order('price_eur', { ascending: true })
        break
      case 'price_desc':
        query = query.order('price_eur', { ascending: false })
        break
      case 'orders_desc':
        query = query.order('orders_count', { ascending: false })
        break
      default:
        query = query.order('trend_score', { ascending: false })
    }

    query = query.limit(limit)
    const { data: products, error } = await query

    if (error) throw error

    // CSV export (premium only)
    if (format === 'csv' && isPremium && products) {
      const headers = ['name', 'category', 'price_eur', 'trend_score', 'orders_count', 'badge', 'aliexpress_url']
      const csvRows = [
        headers.join(','),
        ...products.map((p: Product) =>
          headers.map((h) => {
            const val = p[h as keyof Product]
            return typeof val === 'string' && val.includes(',') ? `"${val}"` : val
          }).join(',')
        ),
      ]
      return new NextResponse(csvRows.join('\n'), {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="trenddrop-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      })
    }

    return NextResponse.json({ products: products ?? [], isPremium })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
