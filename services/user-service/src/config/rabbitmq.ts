import amqp from 'amqplib'
import { config } from './config'
import { QUEUE_NAMES } from '../utils/constant'

let connection: amqp.ChannelModel
let channel: amqp.Channel

export const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(config.RABBITMQ_URL!)
    channel = await connection.createChannel()
    await channel.assertQueue(QUEUE_NAMES.USER_REGISTERED, { durable: true })
    console.log('RabbitMQ connected')
  } catch (error) {
    console.error('RabbitMQ connection failed:', error)
  }
}

export { connection, channel }
