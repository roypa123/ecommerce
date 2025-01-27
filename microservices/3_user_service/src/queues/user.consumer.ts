
import { Channel, ConsumeMessage } from 'amqplib';
import { createConnection } from '@users/queues/connection';

async function consumeAuthEmailMessages(channel: Channel): Promise<void> {
  try {
    if (!channel) {
      channel = await createConnection() as Channel;
    }
    const exchangeName = 'auth_user';
    const routingKey = 'auth_user';
    const queueName = 'auth_user';
    await channel.assertExchange(exchangeName, 'direct');
    const jobberQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(jobberQueue.queue, exchangeName, routingKey);
    channel.consume(jobberQueue.queue, async (msg: ConsumeMessage | null) => {

      // const messageContent = msg!.content.toString();
      // console.log(`Received message: ${messageContent}`);
      // channel.ack(msg!);
      if (msg) {

        const messageContent = msg.content.toString();
        console.log(`Service B received message: ${messageContent}`);


        const response = `Processed message: ${messageContent}`;

        if (msg.properties.replyTo) {
          channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(response),
            { correlationId: msg.properties.correlationId }
          );
        }
        channel.ack(msg!);
      }

    });
  } catch (error) {
    console.log('error', 'UserService EmailConsumer consumeAuthEmailMessages() method error:', error);
  }
}



export { consumeAuthEmailMessages };
