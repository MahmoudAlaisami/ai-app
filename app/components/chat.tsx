import React from "react";
import styles from "@/styles/chat.module.css";
import { Input, Button } from "antd";
import { SendOutlined, EditOutlined } from "@ant-design/icons";
import { chatPropsTypes } from "@/utils/app.t";
// import { data } from '@/temp';

const Chat = ({ chat, setUserData }: chatPropsTypes) => {
  const [prompt, setPromt] = React.useState<string>("");
  const chats = chat!.queries
  const handleSend = () => {
    console.log(".... ", prompt);
    // if(true/* index */){
    //   // send
    //   // save resoponse in item.response
    //   return
    // }
    // Handle send logic
  };

  const handleChatEdit = ({item, index}: any) => {
  //   console.log('....hh ',{item, index});
  //   setPromt(item.request)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromt(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>LLM AI Bot</div>

      <div className={styles.chatContainer}>
        {chats.map((item, index): any => (
          <div key={index} className={styles.chat}>
            <div className={styles.requestContainer}>
              <div className={styles.you}>{chats.length>1 && ("You")}</div>
              <div className={styles.request}>{item?.request}</div>
              <div className={styles.edit}><EditOutlined onClick={()=>handleChatEdit({item, index})} className={styles.editButton}/></div>
            </div>
            <br />
            <div className={styles.responseContainer}>
              <div className={styles.bot}>{chats.length>1 && ("You")}</div>
              <div className={styles.response}>{item?.response}</div>
            </div>
            <br />
            {index !== chats.length - 1 && <hr />} 
          </div>
        ))}
      </div>

      <div className={styles.prompt}>
        <Input
          placeholder="Enter a prompt here"
          value={prompt}
          onChange={handleInputChange}
          className={styles.textArea}
          addonAfter={
            <SendOutlined onClick={handleSend} className={styles.sendButton} />
          }
        />
      </div>
    </div>
  );
};

export default Chat;
