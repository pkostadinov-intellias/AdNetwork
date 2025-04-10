import { typesenseClient } from '../../config/typesense/typesense'

export interface UserUpsertPayload {
  id: string
  username: string
  fullName: string
}

export const handleUserUpsert = async (payload: UserUpsertPayload) => {
  const userDoc = {
    id: payload.id,
    username: payload.username,
    fullName: payload.fullName,
  }

  await typesenseClient.collections('users').documents().upsert(userDoc)
  console.log(`Indexed user: ${userDoc.username}`)
}

export const handleUserDelete = async ({ id }: { id: string }) => {
  await typesenseClient.collections('users').documents(id).delete()
}
