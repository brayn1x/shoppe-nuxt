import type { Category } from '~~/lib/generated/prisma/client'

export interface Product {
  id: number
  name: string
  price: number
  short_description: string
  long_description: string
  sku: string
  discount: number
  images: string[]
  category_id: number
  category: Category
  created_at: string
  updated_at: string
}

export type ProductCreateDto = Omit<Product, 'id' | 'created_at' | 'updated_at' | 'category'>

export interface ProductResponse {
  products: Product[]
  total: number
  minPrice: number
  maxPrice: number
}
