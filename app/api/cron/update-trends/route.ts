import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { fetchHotProducts, mapAliexpressProduct, ALIEXPRESS_CATEGORIES } from '@/lib/aliexpress'

export const dynamic = 'force-dynamic'
export const maxDuration = 300 // 5 minutes

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createSupabaseAdminClient()
  let totalFetched = 0
  let totalUpdated = 0

  try {
    for (const [categoryName, categoryId] of Object.entries(ALIEXPRESS_CATEGORIES)) {
      try {
        const rawProducts = await fetchHotProducts(categoryId, 1, 50)
        totalFetched += rawProducts.length

        for (const rawProduct of rawProducts) {
          const mapped = mapAliexpressProduct(rawProduct)

          // Upsert product
          const { error } = await supabase
            .from('products')
            .upsert(
              {
                ...mapped,
                category: categoryName,
                updated_at: new Date().toISOString(),
              },
              { onConflict: 'aliexpress_id' }
            )

          if (!error) totalUpdated++
        }
      } catch (categoryError) {
        console.error(`Error processing category ${categoryName}:`, categoryError)
        // Continue with other categories
      }
    }

    // Deactivate stale products (not updated in 24h)
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    await supabase
      .from('products')
      .update({ is_active: false })
      .lt('updated_at', cutoff)

    // Log the update
    await supabase.from('trend_updates').insert({
      products_fetched: totalFetched,
      products_updated: totalUpdated,
    })

    console.log(`Cron job completed: ${totalFetched} fetched, ${totalUpdated} updated`)
    return NextResponse.json({
      success: true,
      products_fetched: totalFetched,
      products_updated: totalUpdated,
    })
  } catch (error) {
    console.error('Cron job error:', error)
    return NextResponse.json({ error: 'Cron job failed' }, { status: 500 })
  }
}
