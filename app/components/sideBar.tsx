import React, { use } from "react";
import styles from "@/styles/sideBar.module.css";
import { sideBarProps, chat } from "@/utils/app.t";
import { MenuOutlined, SettingOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Popover, Input } from "antd";
import ChatEdit from "./chatEdit";
import _newChat from "@/utils/newChat"

// change edit functionality:
// change hover to click and add kabab icon at the end of the flex


const SideBar = ({ user, setUser, userData, onSelect, setUserData }: sideBarProps) => {
  const [sideBar, setSideBar] = React.useState<boolean>(false);
  const [profile, setProfile] = React.useState<string>("");

  // React.useEffect(()=>{
  //   setProfile(`${user?.firstName} ${user?.lastName}`)
  //   console.log('.... hhhhh',profile, user?.firstName);
  // },[profile])


  const handleToggleMenu = () => {
    setSideBar(!sideBar);
  };

  const handleChatSelect = (index: number) => {
    onSelect(index);
    console.log(".... chat", userData[index]);
  };

  const handleNewChat = () => {
    console.log(".... new chat should be created");
    const newChat = {
      title: "New Chat",
      queries: [{request: "", response: ""}],
      time: new Date()
    }
    const newData = [...userData, newChat];
    setUserData(newData)
    onSelect(newData.length - 1)
    // handle new chat logic
  };
  
  const handleDelete = (index: number) => {
    const newData = [...userData];
    newData.splice(index, 1); 
    setUserData(newData);
  }

  const handleLogout = () => {
    localStorage.clear();
    setUserData([{
      title: "New Chat",
      queries: [{request: "", response: ""}],
      time: new Date()
    }]);
    setUser(null);
    // await logOut...
  }

  const logoutContent = (
    <div onClick={handleLogout}>Log Out</div>
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
            <Popover content={<ChatEdit chat={chat} index={index} setUserData={setUserData} userData={userData} onDelete={handleDelete}/*onDelete={handleDeleteChat}*/ />} trigger="hover" key={index}>
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
      <div>
        <Popover content={logoutContent} trigger="hover" >
        {sideBar && `${user.firstName} ${user.lastName}`}
      </Popover>
      </div>
    </div>
  );
};

export default SideBar;
