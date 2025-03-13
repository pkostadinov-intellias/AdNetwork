import bcrypt from 'bcryptjs'
import createHttpError from 'http-errors'
import { User, UserRole } from '../entities/User'
import { serializedUser } from '../utils/helper'
import { userRepository } from '../config/database'
import {
  createUserService,
  getUserWithPasswordByUsername,
} from '../users/users.service'
import { createToken } from '../utils/token'
import { publishUserRegistered } from '../events/producer'

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  role: UserRole,
) => {
  const userExists = await userRepository.findOne({ where: { username } })
  if (userExists)
    throw new createHttpError.BadRequest(
      'User with this username already exists',
    )

  const newUser = await createUserService({ username, email, password, role })

  const token = await createToken(newUser)

  await publishUserRegistered({ id: newUser.id, username: newUser.username })

  return { user: { ...serializedUser(newUser) }, token }
}

export const loginUser = async (username: string, password: string) => {
  const user = await getUserWithPasswordByUsername(username)

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid)
    throw new createHttpError.Unauthorized('Invalid credentials')

  const token = await createToken(user)

  return { user: { ...serializedUser(user) }, token }
}
