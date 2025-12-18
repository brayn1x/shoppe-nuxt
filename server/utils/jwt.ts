import jwt from 'jsonwebtoken'

export const signJwt = (payload: object, expiresIn: jwt.SignOptions['expiresIn']) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn
  })
}

export const verifyJwt = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!)
  } catch {
    return null
  }
}
