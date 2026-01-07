<script lang="ts" setup>
useSeoMeta({
  title: 'Каталог',
  description: 'Каталог магазина Shoppe'
})

const router = useRouter()
const route = useRoute()

const showFilters = ref(false)

useProductsFilters()
const filterStore = useFilterStore()
const { categoryOptions, productsData, pending, products } = useProductsData()
const { goToPage } = useProductsPagination()

const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

onMounted(() => {
  const checkWindowWidth = () => {
    showFilters.value = window.innerWidth >= 768
  }

  checkWindowWidth()
  window.addEventListener('resize', checkWindowWidth)

  if (!route.query.page || !route.query.limit) {
    router.replace({
      query: {
        ...route.query,
        page: filterStore.currentPage.toString(),
        limit: filterStore.productsLimit.toString()
      }
    })
  }
})
</script>

<template>
  <div class="products">
    <h1 class="products__title">Каталог товаров</h1>
    <div class="products__filters" @click="toggleFilters">
      <Icon name="icons:filter" size="18" />
      Фильтры
    </div>
    <div class="products__content">
      <div v-if="showFilters" class="products__left">
        <InputField
          v-model="filterStore.searchInput"
          placeholder="Поиск..."
          variant="transparent"
        >
          <Icon name="icons:search" />
        </InputField>
        <DropdownList
          v-if="categoryOptions?.length"
          v-model="filterStore.selectedOption"
          :options="categoryOptions"
          default-option="Категория"
        />
        <PriceRange
          v-if="productsData"
          v-model="filterStore.priceRange"
          :max="productsData.maxPrice"
          :min="productsData.minPrice"
        />
        <div class="products__discount">
          <div>Со скидкой</div>
          <ButtonSwitcher v-model="filterStore.showDiscount" />
        </div>
      </div>
      <div class="products__right">
        <div v-if="pending && !productsData">
          Загрузка...
        </div>
        <div v-else-if="products.length" class="product-list">
          <ProductItem
            v-for="product in products"
            :key="product.id"
            v-bind="product"
          />
        </div>
        <h1 v-else>Товары не найдены</h1>
        <div class="products__pagination">
          <PageNavigation
            v-if="productsData && productsData.total > filterStore.productsLimit"
            :limit="filterStore.productsLimit"
            :page="filterStore.currentPage"
            :total="productsData.total"
            @next="goToPage(filterStore.currentPage + 1)"
            @prev="goToPage(filterStore.currentPage - 1)"
            @to-page="(page) => goToPage(page)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./products.css">

</style>
