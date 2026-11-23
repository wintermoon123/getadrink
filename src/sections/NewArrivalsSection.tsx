import { useState } from 'react'
import { ExternalLink, Sparkles } from 'lucide-react'
import type { NewArrivalsFile } from '@/types/newArrival'

interface NewArrivalsSectionProps {
  data: NewArrivalsFile
}

const PREVIEW_COUNT = 4

function displayLaunchDate(date: string): string {
  const [, month, day] = date.split('-')
  if (!month) return date
  return day ? `${Number(month)} / ${Number(day)}` : `${Number(month)}月`
}

function displayBatch(batch: string): string {
  const [, month, day] = batch.split('-')
  if (!month) return batch
  return day ? `${Number(month)}月${Number(day)}日更新` : `${Number(month)}月更新`
}

// 把 YYYY-MM 归一到该月 1 号，保证与 YYYY-MM-DD 混排时按时间正确排序
function normalizedDate(date: string): string {
  return date.length === 7 ? `${date}-01` : date
}

export function NewArrivalsSection({ data }: NewArrivalsSectionProps) {
  const [expanded, setExpanded] = useState(false)

  if (data.items.length === 0) return null

  const sorted = [...data.items].sort((a, b) =>
    normalizedDate(b.launchDate).localeCompare(normalizedDate(a.launchDate)),
  )
  const visible = expanded ? sorted : sorted.slice(0, PREVIEW_COUNT)
  const hiddenCount = sorted.length - PREVIEW_COUNT

  return (
    <section className="mb-6" aria-labelledby="new-arrivals-title">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          <h2 id="new-arrivals-title" className="font-hand text-3xl leading-none text-foreground">
            新品速递
          </h2>
        </div>
        <span className="font-latin text-base text-muted-foreground">
          {displayBatch(data.batch)}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {visible.map((item) => (
          <article key={item.id} className="journal-card flex flex-col px-4 pb-4 pt-5 sm:px-5">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
                {item.brand}
              </span>
              <span className="shrink-0 font-latin text-base text-accent">
                {displayLaunchDate(item.launchDate)}
              </span>
            </div>

            <h3 className="mt-2.5 flex-1 font-hand text-2xl leading-snug text-foreground">
              {item.name}
            </h3>

            <div className="mt-4 flex items-center justify-between gap-2 border-t border-dashed border-border pt-3">
              <span className="font-latin text-base text-accent">{item.price ?? '价格待定'}</span>
              {item.sourceUrl && (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  {item.sourceName ?? '来源'}
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-3 w-full rounded-md border border-dashed border-border py-2 text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
        >
          {expanded ? '收起' : `查看全部 ${data.items.length} 款新品`}
        </button>
      )}
    </section>
  )
}
