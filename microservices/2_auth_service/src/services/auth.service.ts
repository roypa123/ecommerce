import knexConfig from "../../knexfile";
import knex from "knex";
import HelperFunction from '@auth/helpers/helperfunction';

const db = knex(knexConfig);


export async function userExists(data: any): Promise<any | undefined> {
  try {
    const existingUser = await db("user").where({ email: data }).first();
    return existingUser;
  } catch (error) {
    console.error(error);
    throw Error("User checking error occured")
  }
}

export async function createAuthUser(userData: any): Promise<any | undefined> {
  const name = userData.name;
  const email = userData.email;
  const role = userData.role;
  const password = await HelperFunction.hashPassword(userData.password);

  const currentTime = Date.now();
  const expiry = currentTime + 5 * 60 * 1000;
  const otp = await HelperFunction.generateOTP();
  try {
    const result = await db.transaction(async (trx) => {
      try {
        const [{ user_id: user_id1, name: name1, email: email1 }] = await trx("user")
          .insert({ name, email, password, role })
          .returning([
            "user_id",
            "name",
            "email",
            "role",
          ]);

        const [{ user_id: user_id2, otp_for_create_acount: otp2 }] = await trx("otp_for_createaccount")
          .insert({ user_id: user_id1, otp_for_create_acount: otp, expiry_at: expiry })
          .returning([
            "user_id",
            "otp_for_create_acount",
          ]);

        console.log("Data inserted successfully.");

        const data = { user_id2, otp2, email1, name1 };

        return data;
      } catch (error) {
        await trx.rollback();
        console.error("Error inserting data:", error);
        throw new Error("Failed to create user.");
      }


    });
    return result;
  } catch (error) {
    throw error
  }

}


export async function createAccountOtp1(userData: any): Promise<any | undefined> {
  const email = userData.email;
  const otp = userData.otp;



  try {
    const result = await db.transaction(async (trx) => {

      try {

        const { user_id: user_id4, name: name1, email: email1, role: role1, status: status1 } = await trx("user")
          .select("user_id", "name", "email", "role", "status")
          .where({ email }).first();

        const { otp_for_create_acount: otp1, expiry_at: expiryAt1 } = await trx("otp_for_createaccount")
          .select("otp_for_create_acount", "expiry_at")
          .where({ user_id: user_id4 }).first();


        const dateNow = Date.now();

        if (dateNow < expiryAt1) {
          if (otp == otp1) {

            const user = {
              user_id: user_id4,
              name: name1,
              email: email1,
              role: role1,
              status: status1
            }
            const access_token = await HelperFunction.generateAccessToken(user);
            const refresh_token = await HelperFunction.generateRefreshToken(user);

            const userData2 = await trx("user")
              .where({ user_id: user_id4 })
              .update({
                access_token: access_token,
                refresh_token: refresh_token,
                status: 1
              })
              .returning([
                "user_id",
                "name",
                "email",
                "role",
                "access_token",
                "refresh_token",
                "status"
              ]
              )
            return userData2;
          } else {
            throw new Error("Incorrect Otp");
          }
        } else {
          throw new Error("Failed to create user.");
        }
      } catch (error) {
        await trx.rollback();
        throw error
      }
    });
    return result;
  } catch (error) {
    throw error
  }



}

