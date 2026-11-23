export interface Drink {
  id: string
  date: string
  brand: string
  name: string
  flavor: string
  rating: number
  createdAt: string
  updatedAt: string
}

export type DrinkInput = Omit<Drink, 'id' | 'createdAt' | 'updatedAt'>

export interface DrinksFile {
  version: 1
  updatedAt: string
  drinks: Drink[]
}
