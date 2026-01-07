import { prisma } from '~~/lib/prisma'
import type { ProductCreateDto } from '#shared/interfaces/product.interface'
import type * as Prisma from '~~/lib/generated/prisma/internal/prismaNamespace'

export const createProduct = (data: ProductCreateDto) => {
  return prisma.product.create({
    data
  })
}

export const getProducts = async (params: {
  search?: string
  category?: string
  page?: string
  limit?: string
  discount?: boolean
  price?: [number, number]
}) => {
  const { search, category, page, limit, discount, price } = params

  const where: Prisma.ProductWhereInput = {}

  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: 'insensitive'
        }
      },
      {
        short_description: {
          contains: search,
          mode: 'insensitive'
        }
      },
      {
        long_description: {
          contains: search,
          mode: 'insensitive'
        }
      }
    ]
  }

  if (category) {
    where.category = {
      alias: category
    }
  }

  if (discount) {
    where.discount = {
      gt: 0
    }
  }

  if (price && (price[0] > 0 || price[1] > 0)) {
    where.price = {
      gte: price[0],
      lte: price[1]
    }
  }

  const total = await prisma.product.count({ where })
  const pageNum = Number(page) || 1
  const limitNum = Number(limit) || 6

  const products = await prisma.product.findMany({
    where,
    skip: (pageNum - 1) * limitNum,
    take: limitNum,
    include: {
      category: true
    }
  })

  const priceRange = await prisma.product.aggregate({
    _min: { price: true },
    _max: { price: true }
  })

  return {
    products,
    total,
    minPrice: priceRange._min.price ?? 0,
    maxPrice: priceRange._max.price ?? 0
  }
}
