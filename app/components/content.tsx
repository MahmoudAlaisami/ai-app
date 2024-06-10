"use client";
import React from "react";
import styles from "@/styles/content.module.css";
import { contentPropsTypes, chat } from "@/utils/app.t";
import Chat from "./chat";
import New from "./new";
import SideBar from "./sideBar";
import { mochData } from '../../temp';  //@TODO: delete this line before deployment


const Content = ({ user, userData, updateUserData, logOut, onNewChat }: contentPropsTypes) => {
  const [selectedChatIndex, setSelectedChatIndex] = React.useState<number>(0);
  userData = mochData  //@TODO: delete this line before deployment
  console.log('.... content',{userData});
  React.useEffect(()=>{
    updateUserData();
  }, [])

  const handleChatSelect = (index: number ) => {
    console.log('.... content to display', index);
    setSelectedChatIndex(index)
  };


  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        <Chat 
          chatIndex={selectedChatIndex} 
          userData={userData} 
          refresh={updateUserData} 
        />
      </div>

      <div className={styles.sideBar}>
        <SideBar 
          user={user} 
          userData={userData} 
          refresh={updateUserData} 
          onSelect={(index: number)=>handleChatSelect(index)}
          logOut={logOut}
          onNewChat={onNewChat}
        />
      </div>
    </div>
  );
};

export default Content;
