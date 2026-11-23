import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const ALL = '__all__'

interface FilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  brand: string
  onBrandChange: (value: string) => void
  rating: string
  onRatingChange: (value: string) => void
  brands: string[]
}

export function FilterBar({
  search,
  onSearchChange,
  brand,
  onBrandChange,
  rating,
  onRatingChange,
  brands,
}: FilterBarProps) {
  return (
    <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div className="relative sm:col-span-2">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="搜索品牌或名称"
          className="pl-9"
          aria-label="搜索记录"
        />
      </div>

      <Select value={brand} onValueChange={onBrandChange}>
        <SelectTrigger aria-label="按品牌筛选">
          <SelectValue placeholder="全部品牌" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>全部品牌</SelectItem>
          {brands.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={rating} onValueChange={onRatingChange}>
        <SelectTrigger aria-label="按评分筛选">
          <SelectValue placeholder="全部评分" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>全部评分</SelectItem>
          {[5, 4, 3, 2, 1].map((value) => (
            <SelectItem key={value} value={String(value)}>
              {value} 星及以上
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </section>
  )
}

export { ALL as FILTER_ALL }
