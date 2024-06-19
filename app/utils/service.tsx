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


export const logIn = async ({ email, password }: loginPropsTypes) => {

  const data_log = {
    grant_type: '',
    username: 'zaher@gmail.com',
    password: 'string',
    scope: '',
    client_id: '',
    client_secret: ''
  };
  
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  // Create a FormData object
  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);
  const response = await fetch(URL + "/admin/", {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    //   "access-control-allow-origin": "*",
 
    // },
    headers: headers,
    // body: JSON.stringify({ email, password }),
    body: new URLSearchParams(data_log),
    // body: formData,
  });
  const data = await response.json();
  // if (!data?.match) return alert(`${data?.message}`); // @TODO: implement error handling
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
  const response = await fetch(URL + '/admin/' + userId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "access-control-allow-origin": "*",
    },
  })
  const data = await response.json();
  console.log('.... service ... logout', data);
  return data
};


export const fetchUserData = async ({id}) => {
  const user = getUserInfo();
  const { token } = user
  const response = await fetch(URL + "/api/user/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "access-control-allow-origin": "*",
      'Authorization': `Bearer ${token}`,
    }
  })
  const data = await response.json();
  console.log('.... service .. fetchUserData',data);
  return data
}

export const getCompletion = async ({prompt, conversationId, index}) => {
  try {
    const user = getUserInfo();
    const { token } = user
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({prompt, conversationId, index})
    })
    const data = await response.json()
    return data;
    
  } catch(error) {
    console.log('.... service..getCompletion..error',error);
    throw new Error(error.message)
  }
  
}

export const generateTitle = async({prompt, completion}) => {
  const user = getUserInfo();
  const { token } = user
  const response = await fetch(URL + '', { // @TODO: create api and edit fetch url
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-control-allow-origin": "*",
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({prompt, completion})
  })
}

export const generateFollowUpQuestions = async({data}) => {
  const user = getUserInfo();
  const { token } = user
  const reposne = await fetch(URL + '', { // @TODO: create api and edit fetch url
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-control-allow-origin": "*",
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({data})
  })
}

export const deleteChat = async({id}) => {
  const user = getUserInfo();
  const { token } = user
  const response = await fetch(URL + '', { // @TODO: create api and edit fetch url
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access-control-allow-origin": "*",
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({id, deleted: true})
  })
  if(response.status == 401) {
    await logOut();
    localStorage.clear();
    throw new Error("Unauthorized: Logging out user");
  }
}

// export const renameChat = async() => {}
// @TODO: implement the above function