import React from 'react'
import styles from "@/styles/chatEdit.module.css"
import { chat } from '@/utils/app.t'
import { EditOutlined, DeleteOutlined} from "@ant-design/icons";
import { Modal, Input } from 'antd';


const ChatEdit = ({chat, index, setUserData, userData, onDelete}:any) => {  // fix types !!!
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [newTitle, setNewTitle] = React.useState<string>(chat.title);

  const handleEdit = () => {
    console.log('.... handleEdit',index, chat);
    setIsModalOpen(!isModalOpen)
  };

  const handleDelete = () => {
    console.log('.... handleDelete',index);
    onDelete(index)
    // userData.splice(index,1);
    // setUserData(userData);
  };

  const hadnleInputChange = (e) => {
    console.log('.... hadnleInputChange',e.target.value);
    setNewTitle(e.target.value)
  };
  const handleOk = () => {
    console.log('.... handleOk',);
    userData[index] = {
      title: newTitle,
      queries: chat.queries,
      time: chat.time
    }
    setUserData([...userData, ])
    setIsModalOpen(false)
  };
  const handleCancel = () => {
    console.log('.... handleCancel',);
    setIsModalOpen(false)
  };

  return (
    <div className={styles.container}>
      <div className={styles.editContainer} onClick={handleEdit}>
        <span>edit</span> 
        <span><EditOutlined/></span>
      </div>
      {/* <hr style={{color: "red"}}/> */}
      <div className={styles.deleteContainer} onClick={handleDelete}>
        <span>delete</span> 
        <span><DeleteOutlined /></span>
      </div>
      <Modal title="Change Chat Title" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input value={newTitle} onChange={hadnleInputChange} maxLength={20}/>
      </Modal>
    </div>
  )
}

export default ChatEdit