import type { Category } from '~~/lib/generated/prisma/client'
import type { ProductResponse } from '#shared/interfaces/product.interface'

export const useProductsData = () => {
  const toastStore = useToastStore()
  const filterStore = useFilterStore()

  const query = computed(() => ({
    ...filterStore.query
  }))

  const { data: categoryOptions } = useFetch<Category[]>('/api/category/receive', {
    method: 'GET',
    key: 'categories',
    onResponseError: () => {
      toastStore.showToast('error', 'Ошибка при получении категорий')
    }
  })

  const { data: productsData, pending } = useFetch<ProductResponse>('/api/product/receive', {
    method: 'GET',
    query,
    onResponseError: () => {
      toastStore.showToast('error', 'Ошибка при получении продуктов')
    }
  })

  const products = computed(() => productsData.value?.products ?? [])

  return {
    categoryOptions,
    productsData,
    pending,
    products
  }
}
