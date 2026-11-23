import { Pencil, Star, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Drink } from '@/types/drink'

interface DrinkListProps {
  drinks: Drink[]
  onEdit: (drink: Drink) => void
  onDelete: (id: string) => void
}

function displayDate(date: string): string {
  const [, month, day] = date.split('-')
  return `${Number(month)} / ${Number(day)}`
}

export function DrinkList({ drinks, onEdit, onDelete }: DrinkListProps) {
  return (
    <section className="space-y-5">
      {drinks.map((drink) => (
        <article key={drink.id} className="journal-card px-4 pb-4 pt-6 sm:px-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-latin text-base text-accent">{displayDate(drink.date)}</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span className="truncate">{drink.brand || '未填品牌'}</span>
              </div>
              <h3 className="mt-1 truncate font-hand text-2xl text-foreground">{drink.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                口味：{drink.flavor || '未填'}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(drink)}
                aria-label={`编辑 ${drink.name}`}
                className="cursor-pointer"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(drink.id)}
                aria-label={`删除 ${drink.name}`}
                className="cursor-pointer text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div
            className="mt-4 flex items-center gap-1 border-t border-dashed border-border pt-3"
            aria-label={`评分 ${drink.rating} 星`}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <Star
                key={value}
                className={`h-4 w-4 ${
                  value <= drink.rating ? 'fill-rating text-rating' : 'text-border'
                }`}
              />
            ))}
            <span className="ml-2 font-latin text-base text-muted-foreground">
              {drink.rating}.0
            </span>
          </div>
        </article>
      ))}
    </section>
  )
}
