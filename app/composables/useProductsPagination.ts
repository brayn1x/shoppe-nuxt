export const useProductsPagination = () => {
  const goToPage = (page: number) => {
    const router = useRouter()
    const route = useRoute()

    const filterStore = useFilterStore()

    router.replace({
      query: {
        ...route.query,
        page: page.toString(),
        limit: filterStore.productsLimit.toString()
      }
    })
  }

  return {
    goToPage
  }
}
