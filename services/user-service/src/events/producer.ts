import { channel } from '../config/rabbitmq'
import { QUEUE_NAMES } from '../utils/constant'

export const publishUserRegistered = async (user: {
  id: string
  username: string
}) => {
  if (!channel) {
    console.error('RabbitMQ channel is not initialized')
  }

  channel.sendToQueue(
    QUEUE_NAMES.USER_REGISTERED,
    Buffer.from(JSON.stringify(user)),
    { persistent: true },
  )

  console.log('User registration event published:', user)
}
