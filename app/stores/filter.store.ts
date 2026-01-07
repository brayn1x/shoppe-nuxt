export const useFilterStore = defineStore('filter', () => {
  const route = useRoute()

  const searchInput = ref(route.query.search?.toString() || '')
  const selectedOption = ref(route.query.category?.toString() || '')
  const showDiscount = ref(route.query.discount === 'true')
  const currentPage = ref(Number(route.query.page) || 1)
  const productsLimit = ref(Number(route.query.limit) || 6)
  const priceRange = ref<[number, number]>([
    +(route.query.minPrice ?? 0),
    +(route.query.maxPrice ?? 0)
  ])

  const query = computed(() => ({
    category: selectedOption.value,
    search: searchInput.value,
    page: currentPage.value,
    limit: productsLimit.value,
    discount: showDiscount.value,
    minPrice: priceRange.value[0],
    maxPrice: priceRange.value[1]
  }))

  return {
    searchInput,
    selectedOption,
    showDiscount,
    currentPage,
    productsLimit,
    priceRange,
    query
  }
})
