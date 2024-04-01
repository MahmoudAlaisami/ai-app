import React from 'react'
import styles from "@/styles/content.module.css"
import {contentPropsTypes} from "@/types/app.t"
import Chat from './chat';

const Content = ({user, userData, setUserData}: contentPropsTypes) => {


  return (
    <div className={styles.container}>
      {/* <Sidebar /> */}
      <Chat data={userData}/>
      {/* hello */}

    </div>
  );
};

export default Content