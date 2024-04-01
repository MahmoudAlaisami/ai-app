'use client'
import React from "react";
import styles from "./styles/page.module.css";
import LogIn from "./login/page";
import Content from "@/components/content"

export default function Home() {

  const [user, setUser] = React.useState<any>(false); // !!zabit hay!!!!!
  const [userData, setUserData] = React.useState<boolean>(false);




  const token = user.token

  // const isSignedIn = !!token;
  const isSignedIn = user;
  return (
    <div className={styles.container}>
      {!isSignedIn && <LogIn onSignIn={setUser} />}
      {isSignedIn && <Content user={user} userData={userData} setUserData={setUserData}/>}
    </div>
  );
}
