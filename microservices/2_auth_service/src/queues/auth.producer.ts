import { Channel } from "amqplib";
import { createConnection } from "./connection";

export async function publishDirectMessage(
  channel: Channel,
  exchangeName: string,
  routingKey: string,
  message: string,
  logMessage: string
): Promise<string> {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }

    await channel.assertExchange(exchangeName, 'direct');
    const { queue: replyQueue } = await channel.assertQueue('', { exclusive: true });

    const responsePromise = new Promise<string>((resolve, reject) => {
      channel.consume(
        replyQueue,
        (msg) => {
          if (msg) {
            resolve(msg.content.toString());
            channel.ack(msg);
          } else {
            reject(new Error('No message received in reply queue'));
          }
        },
        { noAck: false }
      );
    });

    // Generate a unique correlation ID for this request
    const correlationId = `correlation-${Date.now()}-${Math.random()}`;


    channel.publish(exchangeName, routingKey, Buffer.from(message),{
      replyTo: replyQueue,
      correlationId,
    });
    console.log(logMessage);


    return await responsePromise;


  } catch (error) {
    console.log('error', 'AuthService Provider publishDirectMessage() method error:', error);
    throw error
  }
}
