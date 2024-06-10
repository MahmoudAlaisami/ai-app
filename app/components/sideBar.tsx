import React, { use } from "react";
import styles from "@/styles/sideBar.module.css";
import { sideBarProps, chat } from "@/utils/app.t";
import { MenuOutlined, SettingOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Popover, Input } from "antd";
import ChatEdit from "./chatEdit";
import _newChat from "@/utils/newChat"
import { deleteChat } from "@/utils/service";

// change edit functionality:
// change hover to click and add kabab icon at the end of the flex
// center the name at the bottom of the sidebar


const SideBar = ({ user, userData, onSelect, refresh, logOut, onNewChat }: sideBarProps) => {
  const [sideBar, setSideBar] = React.useState<boolean>(false);
  console.log('.... sideBar',{userData});
  const firstName = user.firstName !== undefined ? user.firstName : ""
  const lastName = user.lastName !== undefined ? user.lastName : ""


  const handleToggleMenu = () => {
    setSideBar(!sideBar);
  };

  const handleChatSelect = (index: number) => {
    onSelect(index);
    console.log(".... chat", userData[index]);
  };

  const handleNewChat = async() => {
    // @TODO: uncomment the below line
    // if(userData[userData.length - 1].queries[0].prompt == "") return;
    onNewChat();
    onSelect(userData.length - 1);
  };
  
  const handleDelete = async(index: number) => {
    // @TEST: test this function
    const chat = userData[index]
    await deleteChat({id:chat._id})
    refresh()
  }

  const handleLogout = async () => {
    logOut()
  }

  const logoutContent = (
    <div className={styles.logoutButton} onClick={handleLogout}>Log Out</div>
    // @TODO: add profile edit tab
  )


  return (
    <div className={styles.container}>
      <div>
        <div className={styles.menuButtonContainer}>
          <MenuOutlined className={styles.menuButton} onClick={handleToggleMenu} />
        </div>
        <div onClick={handleNewChat} className={styles.newChatContainer}>
          <div>
            <PlusOutlined className={styles.newChatIcon} />
            {/* <span className={styles.newChat}>{sideBar && "New Chat"}</span> */}
          </div>
        </div>
        <div className={styles.chatContainer}>
          {sideBar &&
            userData?.map((chat,index): any => ( // fix type !!!
            <Popover content={<ChatEdit chat={chat} index={index} refresh={refresh} userData={userData} onDelete={handleDelete}/*onDelete={handleDeleteChat}*/ />} trigger="hover" key={index}>
              <div
                onClick={() => handleChatSelect(index)}
                className={styles.chat}
                key={index}
              >
                {chat?.title}
              </div>
            </Popover>
          ))}
        </div>
      </div>
      <div className={styles.profile}>
        <Popover content={logoutContent} trigger="hover" >
        {sideBar && `${firstName} ${lastName}`}
      </Popover>
      </div>
    </div>
  );
};

export default SideBar;
