import React from 'react'
import Chatpg from '../../components/Chatpg'
import SideBar from '../../components/SideBar'
import styles from '../../styles/chat.module.css'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router'
import { collection,query,where,getDocs,db,doc } from '../../firebase'
import { getDoc } from 'firebase/firestore'
import { orderBy } from 'firebase/firestore'

const Chat = ({messages,chat}) => {

  
  const router = useRouter()
  // console.log(router.query);
  console.log(chat)
  console.log(messages)

  return (
    <div>
      <Navbar />
      <div className={styles.chatContainer}>
        <div className={styles.side}>
          <SideBar type={"chats"} />
        </div>
        <div className={styles.mainChat}>
          <Chatpg chat={JSON.parse(chat)} messages={JSON.parse(messages)} id={router.query.id}/>
        </div>
      </div>
    </div>
  )
}

export default Chat

export async function getServerSideProps(context){
  // const msgsRef = query(collection(db, "messages"),where);
  // const q = query(msgsRef, orderBy("createdAt", "asc"));

  // onSnapshot(q, (querySnapshot) => {
  //   let msgs = [];
  //   querySnapshot.forEach((doc) => {
  //     msgs.push(doc.data());
  //   });
   
  // });
  
  const q = doc(db,'chats',context.query.id);
  const getChat = await getDoc(q)

  const msgRef  = query(collection(q,"messages"),orderBy("createdAt","asc"))

  const MessageRes =await getDocs(msgRef)
  // console.log(MessageRes.doc)
  const messages = MessageRes?.docs?.map(doc=>(
      {id:doc.id,...doc.data()}
  )).map(message=>(
      {
          ...message,createdAt:message.createdAt.toDate().getTime()
      }
  ))
  // console.log(messages)
  
  
  return {
    props:{
      messages:JSON.stringify(messages),
      chat:JSON.stringify(getChat.data())
    }
  }
}