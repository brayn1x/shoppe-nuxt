import { prisma } from '~~/lib/prisma'
import bcrypt from 'bcryptjs'
import type { RegisterInterface } from '#shared/interfaces/register.interface'

const saltRounds = 10

export default defineEventHandler(async (event) => {
  const body = await readBody<RegisterInterface>(event)

  const { email, password, confirmPassword, processingPersonalData } = body

  if (!email || !password || !confirmPassword || !processingPersonalData) {
    throw createError({
      statusCode: 400,
      message: 'Заполните все поля'
    })
  }

  if (password !== confirmPassword) {
    throw createError({
      statusCode: 400,
      message: 'Пароли не совпадают'
    })
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (isUserExist) {
    throw createError({
      statusCode: 400,
      message: 'Пользователь с таким email уже существует'
    })
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  })

  return {
    id: user.id,
    email: user.email,
    statusCode: 200
  }
})
