import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase'
import { checkFreemiumLimits, incrementSearchCount } from '@/lib/freemium'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()

  if (!q || q.length < 2) {
    return NextResponse.json({ error: 'Query too short' }, { status: 400 })
  }

  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Check freemium limits
  const limits = await checkFreemiumLimits(user?.id ?? null)
  if (limits.limited) {
    return NextResponse.json({
      limited: true,
      message: limits.message,
      products: [],
    })
  }

  // Search
  const adminSupabase = createSupabaseAdminClient()
  const { data: products, error } = await adminSupabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .ilike('name', `%${q}%`)
    .order('trend_score', { ascending: false })
    .limit(limits.is_premium ? 50 : 6)

  if (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }

  // Increment search count for non-premium users
  if (user && !limits.is_premium) {
    await incrementSearchCount(user.id)
  }

  return NextResponse.json({
    products: products ?? [],
    limited: false,
    searches_used: limits.searches_used + 1,
    searches_limit: limits.searches_limit,
  })
}
