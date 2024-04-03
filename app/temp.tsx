import { chat } from "./utils/app.t"
export const mochData: chat[] = [
{
    title: "My Name",
    queries: [
      {
        request: "what is your name",
        response: "My name is mahmoud"
      },
      {
        request: "hobby hobby hobby",
        response: "happy birthday"
      },
    ],
    time: new Date()
  },
  {
    title: "My Country",
    queries: [
      {
        request: "what is your Country",
        response: "My name is holland"
      },
      {
        request: "what is your Country",
        response: "my name is germany"
      },
    ],
    time: new Date()
  },
  {
    title: "1",
    queries: [
      {
        request: "what is your Country",
        response: "My name is holland"
      },
      {
        request: "what is your Country",
        response: "my name is germany"
      },
    ],
    time: new Date()
  },
  {
    title: "2",
    queries: [
      {
        request: "what is your Country",
        response: "My name is holland"
      },
      {
        request: "what is your Country",
        response: "my name is germany"
      },
    ],
    time: new Date()
  },
]


export const mochUser = {
  email: "mimo@gmail.com",
  password: "mimo1234",
  firstName: "Mahmoud",
  lastName: "Fuhrer"
}


// DATA STRUCTURE
// data (user)= [chats]
// chat = { title, [quries], time(last query) }
// queries = {
//   request,
//   response
// }

