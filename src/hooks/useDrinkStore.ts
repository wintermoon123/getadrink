import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchDrinks, getCurrentUser, saveDrinks } from '@/lib/github'
import { clearToken, getToken, loadCache, saveCache, saveToken } from '@/lib/storage'
import type { Drink, DrinkInput, DrinksFile } from '@/types/drink'

const createId = (): string =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`

export function useDrinkStore() {
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [token, setTokenState] = useState<string | null>(() => getToken())
  const [sha, setSha] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const shaRef = useRef<string | undefined>(undefined)

  const load = useCallback(async (nextToken: string | null) => {
    setLoading(true)
    setError(null)
    if (nextToken) {
      try {
        const result = await fetchDrinks(nextToken)
        setDrinks(result.file.drinks)
        shaRef.current = result.sha
        setSha(result.sha)
        saveCache(result.file.drinks)
        setConnected(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : '连接 GitHub 失败')
        setDrinks(loadCache())
        setConnected(false)
      }
    } else {
      setDrinks(loadCache())
      setConnected(false)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    void load(token)
  }, [token, load])

  const persist = useCallback(
    async (next: Drink[], message: string): Promise<{ synced: boolean }> => {
      setDrinks(next)
      saveCache(next)
      if (!token) return { synced: false }

      setSyncing(true)
      setError(null)
      try {
        const file: DrinksFile = {
          version: 1,
          updatedAt: new Date().toISOString(),
          drinks: next,
        }
        const nextSha = await saveDrinks(token, file, shaRef.current, message)
        shaRef.current = nextSha
        setSha(nextSha)
        setConnected(true)
        return { synced: true }
      } catch (err) {
        setError(err instanceof Error ? err.message : '同步失败')
        setConnected(false)
        return { synced: false }
      } finally {
        setSyncing(false)
      }
    },
    [token],
  )

  const addDrink = useCallback(
    (input: DrinkInput) => {
      const now = new Date().toISOString()
      const drink: Drink = { ...input, id: createId(), createdAt: now, updatedAt: now }
      return persist([drink, ...drinks], `记录一杯：${input.name || input.brand}`)
    },
    [drinks, persist],
  )

  const updateDrink = useCallback(
    (id: string, input: DrinkInput) => {
      const next = drinks.map((item) =>
        item.id === id ? { ...item, ...input, updatedAt: new Date().toISOString() } : item,
      )
      return persist(next, `更新记录：${input.name || input.brand}`)
    },
    [drinks, persist],
  )

  const deleteDrink = useCallback(
    (id: string) => {
      const target = drinks.find((item) => item.id === id)
      const next = drinks.filter((item) => item.id !== id)
      return persist(next, `删除记录：${target?.name || '一杯'}`)
    },
    [drinks, persist],
  )

  const connect = useCallback(async (nextToken: string) => {
    setSyncing(true)
    setError(null)
    try {
      await getCurrentUser(nextToken)
      saveToken(nextToken)
      setTokenState(nextToken)
      return { ok: true as const }
    } catch (err) {
      const message = err instanceof Error ? err.message : '连接失败'
      setError(message)
      return { ok: false as const, message }
    } finally {
      setSyncing(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    clearToken()
    setTokenState(null)
    shaRef.current = undefined
    setSha(undefined)
    setConnected(false)
    setDrinks(loadCache())
  }, [])

  const replaceAll = useCallback(
    (next: Drink[]) => persist(next, '批量同步记录'),
    [persist],
  )

  return {
    drinks,
    token,
    sha,
    loading,
    syncing,
    connected,
    error,
    addDrink,
    updateDrink,
    deleteDrink,
    connect,
    disconnect,
    replaceAll,
  }
}
