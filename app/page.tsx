"use client";
import React from "react";
import styles from "./styles/page.module.css";
import { User, chat } from "./utils/app.t";
import LogIn from "./login/page";
import Content from "@/components/content";
import _newChat from "@/utils/newChat";
import { fetchUserData, logOut } from "./utils/service";

// import { mochData, mochUser } from "../temp";

// fix css responsiveness with sideBar

function Home() {
  const [user, setUser] = React.useState<User | null>(null);
  const [userData, setUserData] = React.useState<chat[] | null>(null);
  const token = user?.token;

  const retrieveUser = () => {
    const userString = localStorage.getItem("user");
    console.log(".... ", { userString });
    if (userString) {
      const user: any = JSON.parse(userString);
      setUser(user);
    }
  };

  React.useEffect(() => {
    retrieveUser();
  }, []);

  const updateUserData = (data: chat[]) => {
    // @TODO: make api call to update user data
    console.log(".... handleUserData", data);
    setUserData(data);
  };

  const handleSignIn = async (_user: User) => {
    let _userData = await fetchUserData({ id: _user._id });
    if (!_userData.length) _userData = [_newChat()];
    setUserData(_userData);
    setUser(_user);
  };

  const onLogOut = async () => {
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
          refresh={updateUserData}
          logOut={onLogOut}
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
