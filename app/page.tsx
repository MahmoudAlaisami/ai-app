"use client";
import React from "react";
import styles from "./styles/page.module.css";
import { User, chat } from "./utils/app.t";
import LogIn from "./login/page";
import Content from "@/components/content";
import _newChat from "@/utils/newChat";
import { fetchUserData, logOut } from "./utils/service";

// import { mochData, mochSignedUser } from "../temp";

// fix css responsiveness with sideBar

function Home() {
  const [user, setUser] = React.useState<User | null>(null)//mochSignedUser);  //@TODO: change state to null before deployment
  const [userData, setUserData] = React.useState<chat[] | null>(null);
  const token = user?.token;
  console.log('userdata', userData)
  // localStorage.setItem('user', JSON.stringify(mochSignedUser))  //@TODO: delete this line before deployment

  const retrieveUser = () => {
    const userString = localStorage.getItem("user");
    if (userString) {
      // const user: any = JSON.parse(userString); //@TODO: I (Zaher) commented these 2 lines because they were causing an error
      // setUser(user);
    }
  };

  const updateUserData = async() => {
    let data = await fetchUserData({ id: user._id });
    if (!data.length) data = [_newChat()];
    console.log(".... handleUserData", data);
    setUserData(data);
  };

  React.useEffect(() => {
    retrieveUser();
  }, []);

  const handleSignIn = async (_user: User) => {
    let data = await fetchUserData({ id: _user._id });
    if (!data.length) data = [_newChat()];
    console.log('.... handleSignIn...userData',data);
    setUserData(data);
    setUser(_user);
  };

  const onNewChat = () => {
    const newChat = _newChat()
    setUserData([...userData, newChat])
  };

  const onLogOut = async () => {
    console.log('.... logging out',);
    await logOut();
    localStorage.clear();
    setUser(null);
  };

  const isSignedIn = !!token;

  return (
    <div className={styles.container}>
      {!isSignedIn && <LogIn onSignIn={handleSignIn} />}
      {isSignedIn && (
        <Content
          user={user}
          userData={userData}
          updateUserData={updateUserData}
          logOut={onLogOut}
          onNewChat={onNewChat}
        />
      )}
    </div>
  );
}

export default Home;

// @TODO:
// 1-edit functionality of fetch User data on all pages
// 2-verify token and it 8rad
// 3-you can add 1 new chat only
// 4- title generation should not work if the title is NOT "new chat" 