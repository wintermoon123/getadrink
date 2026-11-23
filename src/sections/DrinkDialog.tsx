import { useEffect, useState, type FormEvent } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Drink, DrinkInput } from '@/types/drink'

interface DrinkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initial?: Drink | null
  onSubmit: (input: DrinkInput) => Promise<void> | void
}

const today = (): string => new Date().toISOString().slice(0, 10)

export function DrinkDialog({ open, onOpenChange, initial, onSubmit }: DrinkDialogProps) {
  const [date, setDate] = useState(today)
  const [brand, setBrand] = useState('')
  const [name, setName] = useState('')
  const [flavor, setFlavor] = useState('')
  const [rating, setRating] = useState(5)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open) return
    setDate(initial?.date ?? today())
    setBrand(initial?.brand ?? '')
    setName(initial?.name ?? '')
    setFlavor(initial?.flavor ?? '')
    setRating(initial?.rating ?? 5)
  }, [open, initial])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!date || !name.trim()) return
    setSubmitting(true)
    try {
      await onSubmit({
        date,
        brand: brand.trim(),
        name: name.trim(),
        flavor: flavor.trim(),
        rating,
      })
      onOpenChange(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <div className="absolute -top-2 left-8 h-3 w-24 rotate-2 rounded-[2px] bg-accent/60" />
        <DialogHeader>
          <DialogTitle className="font-hand text-3xl">
            {initial ? '改一页' : '记一杯'}
          </DialogTitle>
          <DialogDescription>写下这一杯的日期、品牌、口味和心情分数。</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="drink-date">日期</Label>
            <Input
              id="drink-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="drink-brand">品牌</Label>
              <Input
                id="drink-brand"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
                placeholder="例如：星巴克"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="drink-flavor">口味</Label>
              <Input
                id="drink-flavor"
                value={flavor}
                onChange={(event) => setFlavor(event.target.value)}
                placeholder="例如：燕麦拿铁"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="drink-name">饮料名称</Label>
            <Input
              id="drink-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="例如：冰燕麦拿铁"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label>评分</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  aria-label={`${value} 星`}
                  className="cursor-pointer rounded p-1 transition-colors hover:bg-secondary"
                >
                  <Star
                    className={`h-7 w-7 ${
                      value <= rating ? 'fill-rating text-rating' : 'text-border'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 font-latin text-xl text-muted-foreground">{rating}.0</span>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit" disabled={submitting || !name.trim()}>
              {submitting ? '保存中…' : initial ? '保存修改' : '记下这一杯'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
