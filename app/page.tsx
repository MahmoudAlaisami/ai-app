'use client'
import React from "react";
import styles from "./styles/page.module.css";
import { User, chat } from "./utils/app.t";
import LogIn from "./login/page";
import Content from "@/components/content"
import _newChat from "@/utils/newChat"

// import { mochData, mochUser } from "../temp";


export default function Home() {

  const [user, setUser] = React.useState<User | null>(null);
  const [userData, setUserData] = React.useState<chat[] | null>([_newChat]);

  const retrieveUser = () => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user: any = JSON.parse(userString);
      setUser(user);
    }
  }

  const fetchUserData = async () => {
    const data = userData//await getChats ... api call
    localStorage.setItem("userData", JSON.stringify(data))
    setUserData(data)
  }

  React.useEffect(()=>{
    console.log('.... useEffect',user);
    retrieveUser();
    fetchUserData();
  },[])

  const handleUserData = (data: chat[]) => {
    localStorage.setItem('userData', JSON.stringify(data))
    console.log('.... handleUserData',data);
    setUserData(data);
  }

  const handleSignIn = (_user: User) => {
    setUser(_user);
    fetchUserData();

  }



  const isSignedIn = !!user    ;

  return (
    <div className={styles.container}>
      {!isSignedIn && <LogIn onSignIn={handleSignIn} />}
      {isSignedIn && <Content user={user} userData={userData} setUserData={handleUserData} setUser={setUser}/>}
    </div>
  );
}