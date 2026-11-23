import { useEffect, useMemo, useState } from 'react'
import { Coffee, Plus } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useDrinkStore } from '@/hooks/useDrinkStore'
import { AppHeader } from '@/sections/AppHeader'
import { DrinkDialog } from '@/sections/DrinkDialog'
import { DrinkList } from '@/sections/DrinkList'
import { FilterBar, FILTER_ALL } from '@/sections/FilterBar'
import { SettingsDialog } from '@/sections/SettingsDialog'
import { StatsBar } from '@/sections/StatsBar'
import type { Drink, DrinkInput } from '@/types/drink'

function notifySaved(synced: boolean, action: string) {
  if (synced) {
    toast.success(`${action}已保存并同步到 GitHub`)
  } else {
    toast.info(`${action}已保存到本机，尚未连接 GitHub`)
  }
}

function App() {
  const store = useDrinkStore()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Drink | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [brand, setBrand] = useState(FILTER_ALL)
  const [flavor, setFlavor] = useState(FILTER_ALL)
  const [rating, setRating] = useState(FILTER_ALL)

  const brands = useMemo(
    () => Array.from(new Set(store.drinks.map((item) => item.brand).filter(Boolean))).sort(),
    [store.drinks],
  )
  const flavors = useMemo(
    () => Array.from(new Set(store.drinks.map((item) => item.flavor).filter(Boolean))).sort(),
    [store.drinks],
  )

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    return store.drinks
      .filter((item) => {
        const matchesKeyword =
          !keyword ||
          [item.brand, item.name, item.flavor].some((field) =>
            field.toLowerCase().includes(keyword),
          )
        return (
          matchesKeyword &&
          (brand === FILTER_ALL || item.brand === brand) &&
          (flavor === FILTER_ALL || item.flavor === flavor) &&
          (rating === FILTER_ALL || item.rating >= Number(rating))
        )
      })
      .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt))
  }, [store.drinks, search, brand, flavor, rating])

  useEffect(() => {
    if (store.error) toast.error(store.error)
  }, [store.error])

  const openAdd = () => {
    setEditing(null)
    setDialogOpen(true)
  }

  const openEdit = (drink: Drink) => {
    setEditing(drink)
    setDialogOpen(true)
  }

  const handleSubmit = async (input: DrinkInput) => {
    if (editing) {
      const result = await store.updateDrink(editing.id, input)
      notifySaved(result.synced, '修改')
    } else {
      const result = await store.addDrink(input)
      notifySaved(result.synced, '这一杯')
    }
  }

  const handleDelete = async (id: string) => {
    const target = store.drinks.find((item) => item.id === id)
    if (!target || !window.confirm(`确定删除「${target.name}」吗？`)) return
    const result = await store.deleteDrink(id)
    notifySaved(result.synced, '删除')
  }

  const handleConnect = async (token: string) => {
    const result = await store.connect(token)
    if (result.ok) {
      toast.success('已连接 GitHub，正在拉取记录')
      setSettingsOpen(false)
    }
  }

  const handleExport = () => {
    const payload = {
      version: 1,
      updatedAt: new Date().toISOString(),
      drinks: store.drinks,
    }
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }),
    )
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `getadrink-${new Date().toISOString().slice(0, 10)}.json`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = async (file: File) => {
    try {
      const data = JSON.parse(await file.text())
      const list = Array.isArray(data) ? data : data.drinks
      if (!Array.isArray(list)) throw new Error('文件中没有记录列表')

      const now = new Date().toISOString()
      const normalized: Drink[] = list.map((item: Partial<Drink>, index: number) => ({
        id: item.id || `${Date.now()}-${index}`,
        date: item.date || now.slice(0, 10),
        brand: item.brand || '',
        name: item.name || '未命名',
        flavor: item.flavor || '',
        rating: Number(item.rating) || 5,
        createdAt: item.createdAt || now,
        updatedAt: item.updatedAt || now,
      }))

      await store.replaceAll(normalized)
      toast.success(`已导入 ${normalized.length} 条记录`)
      setSettingsOpen(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '导入失败')
    }
  }

  return (
    <>
      <Toaster position="top-center" theme="light" richColors />

      <main className="min-h-screen px-4 pb-28 pt-2 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <AppHeader
            connected={store.connected}
            syncing={store.syncing}
            onOpenSettings={() => setSettingsOpen(true)}
          />

          <StatsBar drinks={store.drinks} />

          <FilterBar
            search={search}
            onSearchChange={setSearch}
            brand={brand}
            onBrandChange={setBrand}
            flavor={flavor}
            onFlavorChange={setFlavor}
            rating={rating}
            onRatingChange={setRating}
            brands={brands}
            flavors={flavors}
          />

          {store.loading ? (
            <p className="py-16 text-center font-hand text-2xl text-muted-foreground">
              正在翻开手帐…
            </p>
          ) : filtered.length > 0 ? (
            <DrinkList drinks={filtered} onEdit={openEdit} onDelete={handleDelete} />
          ) : (
            <div className="journal-card px-6 py-14 text-center">
              <Coffee className="mx-auto h-8 w-8 text-accent" />
              <p className="mt-3 font-hand text-2xl">这一页还空着</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {store.drinks.length > 0
                  ? '换个筛选条件试试，或记下新的一杯。'
                  : '点右下角的 +，记下第一杯。'}
              </p>
            </div>
          )}
        </div>
      </main>

      <Button
        onClick={openAdd}
        aria-label="新增记录"
        className="fixed right-6 z-40 h-14 w-14 cursor-pointer rounded-full bg-accent text-accent-foreground shadow-lg transition-colors hover:bg-accent/90"
        style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
      >
        <Plus className="h-6 w-6" />
      </Button>

      <DrinkDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initial={editing}
        onSubmit={handleSubmit}
      />

      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        hasToken={Boolean(store.token)}
        syncing={store.syncing}
        onConnect={handleConnect}
        onDisconnect={store.disconnect}
        onExport={handleExport}
        onImport={handleImport}
      />
    </>
  )
}

export default App
