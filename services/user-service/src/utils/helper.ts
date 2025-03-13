import { User } from '../entities/User'

export const serializedUser = (user: User) => {
  const { password: _, ...serializedUser } = user

  return serializedUser
}
