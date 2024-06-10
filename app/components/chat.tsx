import React from "react";
import styles from "@/styles/chat.module.css";
import { Input, Button, Modal } from "antd";
import { SendOutlined, EditOutlined } from "@ant-design/icons";
import { chatPropsTypes } from "@/utils/app.t";
import { getCompletion, generateTitle, generateFollowUpQuestions } from "@/utils/service";
import { mochData } from '../../temp';  //@TODO: delete this line before deployment

const Chat = ({ chatIndex, userData, refresh }: chatPropsTypes) => {
  const [prompt, setPromt] = React.useState<string>("");
  const [index, setIndex] = React.useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [followUpQ, setFollowUpQ] = React.useState<string[]>([])

console.log('.... ',{userData, chatIndex});
  const chat = userData[chatIndex]
  let { queries } = chat

  React.useEffect(() => {
    // if(chat.queries[0].pros
    // console.log('.... ',userData);
  }, [])

  const handleSend = async () => {
    console.log(".... ", prompt);
    if(!prompt) return alert("Type Something First");

    // generate answer
    const completion = await getCompletion({prompt, conversationId: chat._id, index: queries.length});
    // check to generate title
    if(index == 0) {
      const title = await generateTitle({prompt, completion})
      refresh()
    }
    setPromt("");
    // generate follow up questions
    // const questions = await generateFollowUpQuestions()
    // setFollowUpQ(questions)

    // if(queries[0].prompt === ""){
    //   console.log('.... enetered replacing empty chat',);
    //   queries = [{ prompt, completion}];
    //   userData[chatIndex] = chat;
    //   refresh() // @TODO: make api call instead of updateUserData
    //   // setUserData(userData);
    //   return;
    // }
    // console.log('.... entered incrementing chat',)
    // chat.queries = [...chat.queries, { prompt, completion}]
    // userData[chatIndex] = chat
    // setUserData(userData)
    refresh() // @TODO: make api call instead of updateUserData
  };

  const handleChatEdit = ({query, index}: any) => {
    console.log('.... handleChatEdit ',{query, index})
    setPromt(query.prompt);
    setIndex(index);
    setIsModalOpen(true);
  }

  const handleOk = () => {
    console.log('.... handleOk',);
    // send api call
    const completion = null // await call...

    // edit state
    chat.queries[index] = { prompt, completion};
    // setUserData[chatIndex] = chat;
    refresh() // @TODO: make api call instead of updateUserData
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
      <div className={styles.head}>AI PLANNING ASSISTANT</div>

      <div className={styles.chatContainer}>
        {chat?.queries?.map((query, index): any => (
          <div key={index} className={styles.chat}>
            <div className={styles.requestContainer}>
              <div className={styles.you}>{!!(query?.prompt.length) && ("You")}</div>
              <div className={styles.request}>{query?.prompt}</div>
              <div className={styles.edit}><EditOutlined onClick={()=>handleChatEdit({query, index})} className={styles.editButton}/></div>
            </div>
            <br />
            <div className={styles.responseContainer}>
              <div className={styles.bot}>{!!(query?.completion.length) && ("Bot")}</div>
              <p className={styles.response}>
                {query?.completion.split('\n').map((line, index) => (
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
