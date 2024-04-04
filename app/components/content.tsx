import React from "react";
import styles from "@/styles/content.module.css";
import { contentPropsTypes, chat } from "@/utils/app.t";
import Chat from "./chat";
import SideBar from "./sideBar";


const Content = ({ user, userData, setUserData, setUser }: contentPropsTypes) => {

  const [selectedChatIndex, setSelectedChatIndex] = React.useState<number>(0)
  // const chat = selectedChat?.queries

  const handleChatSelect = (index) => {
    console.log('.... content to display', index);
    setSelectedChatIndex(index)
  };


  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        <Chat chatIndex={selectedChatIndex} userData={userData} setUserData={setUserData} />
      </div>

      <div className={styles.sideBar}>
        <SideBar user={user} setUser={setUser} userData={userData} setUserData={setUserData} onSelect={(index)=>handleChatSelect(index)}/>
      </div>
    </div>
  );
};

export default Content;
