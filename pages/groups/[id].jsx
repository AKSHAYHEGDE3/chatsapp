import React from 'react'
import Navbar from '../../components/Navbar'
import styles from '../../styles/chat.module.css'
import GroupChatPg from '../../components/GroupChatPg'
import { useRouter } from 'next/router'
import { collection,query,where,getDocs,db,doc } from '../../firebase'
import { getDoc } from 'firebase/firestore'
import { orderBy } from 'firebase/firestore'
import SideBar from '../../components/SideBar'

const GroupChat = ({messages,chat}) => {
    const router = useRouter()
    console.log(messages)
    console.log(chat)
  return (
    <div>
      <Navbar />
      <div className={styles.chatContainer}>
        <div className={styles.side}>
          <SideBar type={"groups"} />
        </div>
        <div className={styles.mainChat}>
          <GroupChatPg chat={JSON.parse(chat)} messages={JSON.parse(messages)} id={router.query.id}/>
        </div>
      </div>
    </div>
  )
}

export default GroupChat

export async function getServerSideProps(context){

    const q = doc(db,'groupChats',context.query.id);
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