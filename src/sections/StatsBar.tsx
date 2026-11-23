import type { Drink } from '@/types/drink'

interface StatsBarProps {
  drinks: Drink[]
}

export function StatsBar({ drinks }: StatsBarProps) {
  const now = new Date()
  const prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const monthCount = drinks.filter((drink) => drink.date.startsWith(prefix)).length
  const rated = drinks.filter((drink) => drink.rating > 0)
  const average = rated.length
    ? (rated.reduce((total, drink) => total + drink.rating, 0) / rated.length).toFixed(1)
    : '—'

  const items = [
    { label: '本月杯数', value: String(monthCount) },
    { label: '平均评分', value: average },
    { label: '累计记录', value: String(drinks.length) },
  ]

  return (
    <section className="journal-card mb-6 grid grid-cols-3 divide-x divide-border px-2 py-4">
      {items.map((item) => (
        <div key={item.label} className="px-2 text-center">
          <div className="font-latin text-3xl leading-none text-accent">{item.value}</div>
          <div className="mt-1 text-xs text-muted-foreground">{item.label}</div>
        </div>
      ))}
    </section>
  )
}
