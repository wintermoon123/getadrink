import type { Drink } from '@/types/drink'

const TOKEN_KEY = 'getadrink:github-token'
const CACHE_KEY = 'getadrink:drinks-cache'

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY)
export const saveToken = (token: string): void => localStorage.setItem(TOKEN_KEY, token)
export const clearToken = (): void => localStorage.removeItem(TOKEN_KEY)

export function loadCache(): Drink[] {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? (JSON.parse(raw) as Drink[]) : []
  } catch {
    return []
  }
}

export function saveCache(drinks: Drink[]): void {
  localStorage.setItem(CACHE_KEY, JSON.stringify(drinks))
}
