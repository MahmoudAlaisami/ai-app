'use client'
import React from "react";
import styles from "./styles/page.module.css";
import { User, chat } from "./utils/app.t";
import LogIn from "./login/page";
import Content from "@/components/content"

import { mochData, mochUser } from "@/temp";


export default function Home() {

  const [user, setUser] = React.useState<User | null>(null);
  const [userData, setUserData] = React.useState<chat[] | []>([]);
  const [token, setToken] = React.useState<string>('');


  React.useEffect(()=>{
    console.log('.... useEffect',user);
    // const _token = localStorage.get('token')
    // setToken(_token)
  },[user])



  // const isSignedIn = !!token;
  const isSignedIn = true    ;

  return (
    <div className={styles.container}>
      {!isSignedIn && <LogIn onSignIn={setUser} />}
      {isSignedIn && <Content user={user} userData={userData} setUserData={setUserData} />}
    </div>
  );
}

const _newChat = {
  title: "New Chat",
  queries: [{request: "", response: ""}],
  time: Date.now()
}