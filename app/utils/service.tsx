import { loginPropsTypes, User } from "./app.t";
import prisma from "./prisma";
import { chain } from "./chatModel";

export const getUserData = () => {
  const storageData: Object | any =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userData") || "{}")
      : null;
  return storageData;
};

// install bcrypt and import prisma

export const logIn = async ({ email, password }: loginPropsTypes) => {
  try {
    // // Find user by email
    // const user = await prisma.user.findUnique({
    //   where: {
    //     email: email,
    //   },
    // });

    // if (!user) {
    //   throw new Error("User not found");
    // }

    // // Check password
    // const passwordMatch = (password === user.password);
    // if (!passwordMatch) {
    //   throw new Error("Incorrect password");
    // }

   // save the user in local storage
   const user = {email, password, fistName: 'namek', lasName: "last nameK"}
   delete user.password
   localStorage.setItem("user", JSON.stringify(user)); 

    // Return the authenticated user
    return user;
  } catch (error) {
    throw new Error("Login failed: " + error.message);
  }
};

export const _signUp = async ({ email, password, firstName, lastName, gender, birthDay }: User) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // check if the user already exists
    if (existingUser) throw new Error("Email already in use");

    //  create new user
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        birthDay: birthDay,
      },
    });

   // save the user in local storage
  //  const newUser = {email, password, fistName: 'kk', lasName: "K"}
  delete newUser.password
   localStorage.setItem("user", JSON.stringify(newUser)); 

    return newUser;
  } catch (error) {
    console.log("Sign Up failed:", error.message);
    throw new Error(error);
  }
};

// export const getChats = async (userId: number) => {
//   try {
//     // const userChats = await prisma.users.findUnique({
//     //   where: { id: userId },
//     //   include: {
//     //     chats: {
//     //       include: {
//     //         queries: true
//     //       }
//     //     }
//     //   }
//     // });
//     //
//     // return userChats;

//     // Find user by ID and include associated chats
//     const user = await prisma.user.findUnique({
//       where: {
//         id: userId,
//       },
//       include: {
//         Chat: true, // Include associated chats
//       },
//     });

//     if (!user) {
//       throw new Error("User not found");
//     }

//     // Return the user's chats
//     return user.Chat;
//   } catch (error) {
//     console.error("Error fetching user chats:", error);
//     throw error;
//   }
// };

// export const createAndUpdateChat = async ({ userId, chat }) => {
//   try {
//     const existingChat = await prisma.chat.findUnique({
//       where: {
//         userId,
//         title: chat.title,
//       },
//     });

//     // if chat is not found create it
//     if (!existingChat) {
//       // Get last 6 chats of the user
//       const lastSixChats = await prisma.chat.findMany({
//         where: {
//           userId: userId,
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//         take: 6,
//       });

//       // Check if there are 6 chats and if the 6th chat was created today
//       if (lastSixChats.length === 6) {
//         const sixthChatDate = new Date(lastSixChats[5].createdAt);
//         const today = new Date();
//         if (
//           sixthChatDate.getFullYear() === today.getFullYear() &&
//           sixthChatDate.getMonth() === today.getMonth() &&
//           sixthChatDate.getDate() === today.getDate()
//         ) {
//           throw new Error("You cannot create more than 6 chats in a day");
//         }
//       }

//       const newChat = await prisma.chat.create({
//         data: {
//           userId: userId,
//           title: chat.title,
//           queries: {
//             create: chat.queries.map((query) => ({
//               request: query.request,
//               response: query.response,
//             })),
//           },
//         },
//         include: {
//           queries: true, // Include associated queries
//         },
//       });

//       return newChat;
//     }

//     const updatedChat = await prisma.chat.update({
//       where: {
//         userId,
//         title: chat.title,
//       },
//       data: {
//         title: chat.title,
//         queries: {
//           // Delete existing queries and create new ones
//           deleteMany: {},
//           create: chat.queries.map((query) => ({
//             request: query.request,
//             response: query.response,
//           })),
//         },
//       },
//       include: {
//         queries: true, // Include associated queries
//       },
//     });

//     return updatedChat;
//   } catch (error) {
//     throw new Error("Failed to update or create chat: " + error.message);
//   }
// };


// export const deleteChat = async (chatId) => {
//   try {
//     // Delete the chat by ID
//     const deletedChat = await prisma.chat.delete({
//       where: {
//         id: chatId,
//       },
//     });

//     return deletedChat;
//   } catch (error) {
//     throw new Error("Failed to delete chat: " + error.message);
//   }
// };


export const apiCall = async ({prompt}) => {
  // const response = await chain.call({
  //   input: prompt
  // });
  const response = null
  return response
}