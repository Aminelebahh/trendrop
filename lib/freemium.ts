import { createSupabaseAdminClient } from '@/lib/supabase'

export const FREE_PRODUCTS_LIMIT = 3
export const FREE_SEARCHES_LIMIT = 3

export async function checkFreemiumLimits(userId: string | null): Promise<{
  is_premium: boolean
  limited: boolean
  searches_used: number
  searches_limit: number
  message?: string
}> {
  if (!userId) {
    return {
      is_premium: false,
      limited: true,
      searches_used: 0,
      searches_limit: FREE_SEARCHES_LIMIT,
      message: 'Connectez-vous pour accéder aux produits tendance.',
    }
  }

  const supabase = createSupabaseAdminClient()
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('is_premium, daily_searches_count, daily_searches_reset_at')
    .eq('id', userId)
    .single()

  if (error || !profile) {
    return {
      is_premium: false,
      limited: false,
      searches_used: 0,
      searches_limit: FREE_SEARCHES_LIMIT,
    }
  }

  if (profile.is_premium) {
    return {
      is_premium: true,
      limited: false,
      searches_used: 0,
      searches_limit: Infinity,
    }
  }

  // Reset counter if last reset was before today midnight
  const now = new Date()
  const resetAt = profile.daily_searches_reset_at ? new Date(profile.daily_searches_reset_at) : null
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  let searchesUsed = profile.daily_searches_count ?? 0
  if (!resetAt || resetAt < todayMidnight) {
    // Reset the counter
    await supabase
      .from('profiles')
      .update({ daily_searches_count: 0, daily_searches_reset_at: todayMidnight.toISOString() })
      .eq('id', userId)
    searchesUsed = 0
  }

  const limited = searchesUsed >= FREE_SEARCHES_LIMIT

  return {
    is_premium: false,
    limited,
    searches_used: searchesUsed,
    searches_limit: FREE_SEARCHES_LIMIT,
    message: limited
      ? 'Vous avez atteint votre limite quotidienne de 3 recherches. Passez Premium pour des recherches illimitées !'
      : undefined,
  }
}

export async function incrementSearchCount(userId: string): Promise<void> {
  const supabase = createSupabaseAdminClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('daily_searches_count, daily_searches_reset_at, is_premium')
    .eq('id', userId)
    .single()

  if (!profile || profile.is_premium) return

  const now = new Date()
  const resetAt = profile.daily_searches_reset_at ? new Date(profile.daily_searches_reset_at) : null
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  if (!resetAt || resetAt < todayMidnight) {
    await supabase
      .from('profiles')
      .update({ daily_searches_count: 1, daily_searches_reset_at: todayMidnight.toISOString() })
      .eq('id', userId)
  } else {
    await supabase
      .from('profiles')
      .update({ daily_searches_count: (profile.daily_searches_count ?? 0) + 1 })
      .eq('id', userId)
  }
}
