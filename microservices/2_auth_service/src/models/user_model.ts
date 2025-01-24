import knexConfig from '../../knexfile';
import { knex, Knex as KnexType } from 'knex';
const knexInstance: KnexType = knex(knexConfig);



export async function createUser(userData: any): Promise<void> {
  try {
    console.log("chimchim123");

    const name = "tinu1";
    const email = "martin1@gmail.com";
    const password = "marty@1216"
    const role = "admin";

    console.log("tun");

    const createdUser = await knexInstance("users")
      .insert({ name, email, password })
      .returning([
        "user_id",
        "name",
        "email",
        "password",
      ]);

    console.log("dundo");

    const createdUser1 = createdUser[0];

    return createdUser1;
  } catch (error) {
    console.log(error);
  }
}




