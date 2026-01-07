import { getProducts } from '~~/server/services/product.service'

export default defineEventHandler((event) => {
  const queryParams = getQuery(event)

  const token = getCookie(event, 'token')
  if (!token) throw badRequest(400, 'Вы не авторизованы')

  return getProducts({
    search: queryParams.search?.toString(),
    category: queryParams.category?.toString(),
    page: queryParams.page?.toString(),
    limit: queryParams.limit?.toString(),
    discount: queryParams.discount === 'true',
    price: [Number(queryParams.minPrice), Number(queryParams.maxPrice)]
  })
})
