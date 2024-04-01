import React from 'react';
import styles from "@/styles/chat.module.css"
import { Input, Button } from 'antd';


interface propsTypes {
  data: [];
}

const Chat = ({data}: propsTypes) => {

  const [prompt, setPromt] = React.useState<string>('');

  const handleSend = () => {
    console.log('.... ',prompt);
    // Handle send logic
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromt(e.target.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.chat}>CHAT WITH USER</div>

      <div className={styles.prompt}>
        <Input 
          placeholder='Enter a prompt here'
          value={prompt}
          onChange={handleInputChange}
          className={styles.textArea} />
        <Button type="primary" className={styles.button} onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
