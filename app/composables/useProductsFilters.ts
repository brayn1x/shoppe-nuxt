import { useDebounceFn } from '@vueuse/core'

export const useProductsFilters = () => {
  const router = useRouter()
  const route = useRoute()

  const store = useFilterStore()

  watch(
    () => [store.searchInput, store.selectedOption, store.showDiscount, store.priceRange],
    () => {
      store.currentPage = 1

      changeRoute(
        store.searchInput,
        store.selectedOption,
        store.showDiscount.toString(),
        store.priceRange[0].toString(),
        store.priceRange[1].toString()
      )
    }
  )

  watch(
    () => route.query.page,
    (page) => {
      store.currentPage = Number(page) || 1
    }
  )

  const changeRoute = useDebounceFn((search: string, category: string, discount: string, minPrice: string, maxPrice: string) => {
    const newQuery: Record<string, string> = {}

    if (search) newQuery.search = search
    if (category) newQuery.category = category

    newQuery.page = store.currentPage.toString()
    newQuery.limit = store.productsLimit.toString()

    newQuery.minPrice = minPrice
    newQuery.maxPrice = maxPrice

    if (discount === 'true') newQuery.discount = discount

    router.replace({
      query: {
        ...newQuery
      }
    })
  }, 300)
}
