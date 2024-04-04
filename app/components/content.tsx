import React from "react";
import styles from "@/styles/content.module.css";
import { contentPropsTypes, chat } from "@/utils/app.t";
import Chat from "./chat";
import SideBar from "./sideBar";


const Content = ({ user, userData, setUserData, setUser }: contentPropsTypes) => {

  const [selectedChat, setSelectedChat] = React.useState<chat>(userData[0])
  // const chat = selectedChat?.queries

  const handleChatSelect = (chat) => {
    console.log('.... content to display',chat);
    setSelectedChat(chat)
  };


  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        <Chat chat={selectedChat} userData={userData} setUserData={setUserData} />
      </div>

      <div className={styles.sideBar}>
        <SideBar user={user} setUser={setUser} userData={userData} setUserData={setUserData} onSelect={(data)=>handleChatSelect(data)}/>
      </div>
    </div>
  );
};

export default Content;
