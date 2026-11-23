import { Cloud, CloudOff, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AppHeaderProps {
  connected: boolean
  syncing: boolean
  onOpenSettings: () => void
}

export function AppHeader({ connected, syncing, onOpenSettings }: AppHeaderProps) {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()

  return (
    <header className="relative mb-8 pt-8">
      <div className="absolute -top-1 left-6 h-3.5 w-16 -rotate-2 rounded-[2px] bg-accent/70" />

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-hand text-5xl leading-none text-foreground sm:text-6xl">记一杯</h1>
          <p className="mt-2 text-sm text-muted-foreground">一页一杯，慢慢记录。</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="date-stamp text-lg" aria-label="今天">
            <span>
              {month}
              <span className="mx-0.5">/</span>
              {day}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSettings}
            aria-label="打开设置"
            className="cursor-pointer"
          >
            <Settings2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div
        className={`mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${
          connected ? 'border-accent/40 text-accent' : 'border-border text-muted-foreground'
        }`}
      >
        {connected ? <Cloud className="h-3.5 w-3.5" /> : <CloudOff className="h-3.5 w-3.5" />}
        {syncing ? '正在同步…' : connected ? '已连接 GitHub' : '仅本地保存'}
      </div>
    </header>
  )
}
