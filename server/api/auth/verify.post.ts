import { verifyJwt } from '~~/server/utils/jwt'

export default defineEventHandler((event) => {
  const token = getCookie(event, 'token')

  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Отсутствует токен'
    })
  }

  const payload = verifyJwt(token)

  if (!payload) {
    deleteCookie(event, 'token')
    throw createError({
      statusCode: 401,
      message: 'Недействительный токен'
    })
  }

  return { statusCode: 200 }
})
