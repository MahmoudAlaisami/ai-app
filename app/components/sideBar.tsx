import React from "react";
import styles from "@/styles/sideBar.module.css";
import { sideBarProps, chat } from "@/utils/app.t";
import { MenuOutlined, SettingOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Popover, Input } from "antd";
import ChatEdit from "./chatEdit";
// change edit functionality:
// change hover to click and add kabab icon at the end of the flex
  setUserData: Function;
const SideBar = ({ user, userData, onSelect, setUserData }: sideBarProps) => {
  const [sideBar, setSideBar] = React.useState<boolean>(false);
  const { firstName, lastName } = user;
  // console.log(".... ", { firstName, lastName });

  const handleToggleMenu = () => {
    setSideBar(!sideBar);
  };

  const handleChatSelect = (chat: chat) => {
    onSelect(chat);
    console.log(".... chat", chat);
  };

  const handleNewChat = () => {
    console.log(".... new chat should be created");
    // handle new chat logic
  };
  
  const handleDelete = (index: number) => {
    userData.splice(index,1);
    setUserData(userData);
  }
  

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.menuButtonContainer}>
          <MenuOutlined className={styles.menuButton} onClick={handleToggleMenu} />
        </div>
        <div onClick={handleNewChat} className={styles.newChatContainer}>
          <div>
            <PlusOutlined className={styles.newChatIcon} />
            <span /*className={styles.newChat}*/>{sideBar && "New Chat"}</span>
          </div>
        </div>
        <div className={styles.chatContainer}>
          {sideBar &&
            userData?.map((chat,index): any => ( // fix type !!!
            <Popover content={<ChatEdit chat={chat} index={index} setUserData={setUserData} userData={userData} onDelete={handleDelete}/*onDelete={handleDeleteChat}*/ />} trigger="hover" key={index}>
              <div
                onClick={() => handleChatSelect(chat)}
                className={styles.chat}
              >
                {chat?.title}
              </div>
            </Popover>
          ))}
        </div>
      </div>
      <div className={styles.profile}>
        <div className={styles.name}>
          {sideBar && `${firstName} ${lastName}`}
        </div>
        <div>
          <SettingOutlined />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
