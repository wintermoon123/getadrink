export interface NewArrival {
  id: string
  brand: string
  name: string
  price?: string
  launchDate: string
  sourceUrl?: string
  sourceName?: string
}

export interface NewArrivalsFile {
  batch: string
  updatedAt: string
  items: NewArrival[]
}
