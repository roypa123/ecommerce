

// class UserModel {

//   static async createUser(userData) {
//     const first_name = userData.first_name;
//     const last_name = userData.last_name;
//     const email = userData.email;
//     const role = userData.role;
//     // const password = await HelperFunction.hashPassword(userData.password);
//     // const apikey = await HelperFunction.generateApiKey();
//     const password = "marty@1216"
//     const access_token = "123456asasasasasa";

//     const createdUser = await knex("user")
//       .insert({ first_name, last_name, email, password, access_token, role })
//       .returning([
//         "user_id",
//         "name",
//         "email",
//         "role",
//         "access_token",
//       ]);

//     const createdUser1 = createdUser[0];

//     return createdUser1;
//   }



// }
