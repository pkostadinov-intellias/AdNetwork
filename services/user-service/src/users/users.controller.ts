import { Context } from 'koa'
import {
  createUserService,
  deleteUserService,
  getUserByIdService,
  getUserByUsernameService,
  getUsersService,
  updateUserService,
} from './users.service'
import { User } from '../entities/User'

export const getUsers = async (ctx: Context) => {
  ctx.body = await getUsersService()
}

export const getUserById = async (ctx: Context) => {
  const { id } = ctx.params
  ctx.body = await getUserByIdService(id)
}

export const getUserByUsername = async (ctx: Context) => {
  const { username } = ctx.params
  ctx.body = await getUserByUsernameService(username)
}

export const createUser = async (ctx: Context) => {
  ctx.body = await createUserService(ctx.request.body as Partial<User>)
  ctx.status = 201
}

export const updateUser = async (ctx: Context) => {
  const { id } = ctx.params
  ctx.body = await updateUserService(id, ctx.request.body as Partial<User>)
}

export const deleteUser = async (ctx: Context) => {
  const { id } = ctx.params
  await deleteUserService(id)
  ctx.status = 204
}
