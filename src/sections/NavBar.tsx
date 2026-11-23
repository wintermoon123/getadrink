import { Coffee, Plus, Sparkles } from 'lucide-react'

export type TabKey = 'newarrivals' | 'drinks'

interface NavBarProps {
  active: TabKey
  onChange: (tab: TabKey) => void
  onRecord: () => void
}

export function NavBar({ active, onChange, onRecord }: NavBarProps) {
  const tabClass = (selected: boolean) =>
    `flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md px-2 py-2.5 text-sm transition-colors ${
      selected
        ? 'bg-accent font-medium text-accent-foreground shadow-sm'
        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
    }`

  return (
    <nav
      className="mb-6 grid grid-cols-3 gap-2 border-b border-dashed border-border pb-3"
      aria-label="主导航"
    >
      <button
        type="button"
        onClick={() => onChange('newarrivals')}
        aria-current={active === 'newarrivals' ? 'page' : undefined}
        className={tabClass(active === 'newarrivals')}
      >
        <Sparkles className="h-4 w-4" />
        看新品
      </button>

      <button type="button" onClick={onRecord} className={tabClass(false)}>
        <Plus className="h-4 w-4" />
        记一杯
      </button>

      <button
        type="button"
        onClick={() => onChange('drinks')}
        aria-current={active === 'drinks' ? 'page' : undefined}
        className={tabClass(active === 'drinks')}
      >
        <Coffee className="h-4 w-4" />
        喝过的
      </button>
    </nav>
  )
}
