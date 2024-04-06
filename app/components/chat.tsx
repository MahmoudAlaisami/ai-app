import React from "react";
import styles from "@/styles/chat.module.css";
import { Input, Button, Modal } from "antd";
import { SendOutlined, EditOutlined } from "@ant-design/icons";
import { chatPropsTypes } from "@/utils/app.t";
import { apiCall } from "@/utils/service";
// import { data } from '@/temp';

const Chat = ({ chatIndex, userData, setUserData }: chatPropsTypes) => {
  const [prompt, setPromt] = React.useState<string>("");
  const [index, setIndex] = React.useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);


  const chat = userData[chatIndex]

  React.useEffect(() => {
    if(chat.queries[0].response !== "") {
      return setIsVisible(true)
    }
    setIsVisible(false)
    console.log('.... ',userData);
  }, [])

  const handleSend = async () => {
    console.log(".... ", prompt);
    if(!prompt) return alert("Type Something First");

    // send api call
    const response = await apiCall({prompt})
    // edit state
    // test this 
    setPromt("")
    if(chat.queries[0].request === ""){
      console.log('.... enetered replacing empty chat',);
      chat.queries = [{request: prompt, response}];
      userData[chatIndex] = chat;
      setUserData(userData);
      return;
    }
    console.log('.... entered incrementing chat',)
    chat.queries = [...chat.queries, {request: prompt, response}]
    userData[chatIndex] = chat
    setUserData(userData)
  };

  const handleChatEdit = ({query, index}: any) => {
    console.log('.... handleChatEdit ',{query, index})
    setPromt(query.request);
    setIndex(index);
    setIsModalOpen(true);
  }

  const handleOk = () => {
    console.log('.... handleOk',);
    // send api call
    const response = null // await call...

    // edit state
    chat.queries[index] = {request: prompt, response};
    setUserData[chatIndex] = chat;
    // reset fields and close modal
    setIndex(null)
    setIsModalOpen(false)
  };
  const handleCancel = () => {
    console.log('.... Cancel Modal',);
    setIndex(null)
    setIsModalOpen(false)
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromt(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>LLM AI Bot</div>

      <div className={styles.chatContainer}>
        {chat?.queries?.map((query, index): any => (
          <div key={index} className={styles.chat}>
            <div className={styles.requestContainer}>
              <div className={styles.you}>{!!(query?.request.length) && ("You")}</div>
              <div className={styles.request}>{query?.request}</div>
              <div className={styles.edit}><EditOutlined onClick={()=>handleChatEdit({query, index})} className={styles.editButton}/></div>
            </div>
            <br />
            <div className={styles.responseContainer}>
              <div className={styles.bot}>{!!(query?.response.length) && ("Bot")}</div>
              <p className={styles.response}>
                {query?.response.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
                ))}
              </p>
            </div>
            <br />
            {index !== chat?.queries.length - 1 && <hr />} 
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

      <Modal title="Edit Prompt" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input value={prompt} onChange={handleInputChange} maxLength={20}/>
      </Modal>
    </div>
  );
};

export default Chat;
