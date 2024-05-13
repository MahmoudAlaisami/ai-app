"use client";
import React from "react";
import styles from "@/styles/content.module.css";
import { contentPropsTypes, chat } from "@/utils/app.t";
import Chat from "./chat";
import SideBar from "./sideBar";


const Content = ({ user, userData, refresh, logOut }: contentPropsTypes) => {

  const [selectedChatIndex, setSelectedChatIndex] = React.useState<number>(0)

  const handleChatSelect = (index: number ) => {
    console.log('.... content to display', index);
    setSelectedChatIndex(index)
  };


  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        {/* <Chat 
          chatIndex={selectedChatIndex} 
          userData={userData} 
          refresh={updateUserData} 
        /> */}
      </div>

      <div className={styles.sideBar}>
        <SideBar 
          user={user} 
          userData={userData} 
          refresh={refresh} 
          onSelect={(index: number)=>handleChatSelect(index)}
          logOut={logOut}
        />
      </div>
    </div>
  );
};

export default Content;
