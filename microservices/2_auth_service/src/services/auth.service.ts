import{ createUser} from "../models/user_model"

export async function createAuthUser(data: any): Promise<any | undefined> {

  const result = await createUser("fggf");

}
