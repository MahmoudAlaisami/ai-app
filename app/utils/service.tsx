import { loginPropsTypes, User } from "./app.t";

const saltRounds = 10;
const URL = "http://localhost:5000";


export const getUserInfo = () => {
  const storageData: Object | any =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : null;
  return storageData;
};

export const fetchUserData = async ({id}) => {
  const resposne = await fetch(URL + "/api/user/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "access-control-allow-origin": "*",
    }
  })
  const data = resposne.json();
  console.log('.... service .. fetchUserData',data);
  return data
}

export const logIn = async ({ email, password }: loginPropsTypes) => {
  const response = await fetch(URL + "/admin/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-control-allow-origin": "*",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  // if (!data?.match) return alert(`${data?.message}`); // @CHECK: alert part
  console.log("....service login", data);
  const { user } = data
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};

export const signUp = async ({ email, password, firstName, lastName, gender, age }: User) => {
  const response = await fetch(URL + "/admin/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-control-allow-origin": "*",
    },
    body: JSON.stringify({ email, password, firstName, lastName, gender, age }),
  });
  const data = await response.json();
  // if (!data?.user.token) return alert(`${data?.message}`); // @CHECK: alert part
  console.log("....service login", data);
  const { user } = data
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};

export const logOut = async () => {
  const storageData = getUserInfo()
  const userId = storageData._id
  console.log('.... userId',userId);
  const resposne = await fetch(URL + '/admin/' + userId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "access-control-allow-origin": "*",
    },
  })
  const data = await resposne.json();
  console.log('.... service ... logout', data);
  return data
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

  try {
    const response =0
  
    console.log('.... service..apiCall..response',response);
    return response
    
  } catch(error) {
    console.log('.... service..apiCall..error',error);
    throw new Error(error.message)
  }
  
}

// console.log('.... example',apiCall({prompt: "what is you name"}));