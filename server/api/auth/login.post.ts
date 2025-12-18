import { prisma } from '~~/lib/prisma'
import bcrypt from 'bcryptjs'
import { signJwt } from '~~/server/utils/jwt'
import type { LoginInterface } from '#shared/interfaces/login.interface'

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginInterface>(event)

  const { email, password, rememberUser } = body

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Заполните все поля'
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user) {
    throw createError({
      statusCode: 400,
      message: 'Пользователя с таким email не существует'
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw createError({
      statusCode: 400,
      message: 'Неверный пароль'
    })
  }

  const expiresIn = rememberUser ? '30d' : '1d'

  const token = signJwt({ id: user.id }, expiresIn)

  const day = 60 * 60 * 24
  const month = day * 30

  setCookie(event, 'token', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: rememberUser ? month : day
  })

  return {
    id: user.id,
    email: user.email,
    statusCode: 200
  }
})
