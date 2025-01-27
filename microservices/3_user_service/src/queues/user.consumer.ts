
import { Channel, ConsumeMessage } from 'amqplib';
import { createConnection } from '@users/queues/connection';

async function consumeAuthEmailMessages(channel: Channel): Promise<void> {
  try {
    if (!channel) {
      channel = await createConnection() as Channel;
    }
    const exchangeName = 'user-service';
    const routingKey = 'user-service';
    const queueName = 'auth-email-queue';
    await channel.assertExchange(exchangeName, 'direct');
    const jobberQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(jobberQueue.queue, exchangeName, routingKey);
    channel.consume(jobberQueue.queue, async (msg: ConsumeMessage | null) => {
      // const { receiverEmail, username, verifyLink, resetLink, template, otp } = JSON.parse(msg!.content.toString());
      const messageContent = msg!.content.toString();
      console.log(`Received message: ${messageContent}`);
      channel.ack(msg!);
    });
  } catch (error) {
    console.log('error', 'UserService EmailConsumer consumeAuthEmailMessages() method error:', error);
  }
}



export { consumeAuthEmailMessages };
