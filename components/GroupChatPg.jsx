import React, { useEffect, useState, useRef } from 'react'
import styles from '../styles/chatpg.module.css'
import SendIcon from '@mui/icons-material/Send';
import { addDoc, auth, collection, db, doc, query, where, getDocs } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { Timestamp, onSnapshot, orderBy } from 'firebase/firestore';
import timeSince from './helperFunction';
import Message from './Message';
import Avatar from './Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";


const GroupChatPg = ({ messages, chat, id }) => {

    const [user, loading, error] = useAuthState(auth);
    const [Messages, setMessages] = useState(null)
    const [text, setText] = useState('')
    const chatRef = doc(db, 'groupChats', id)
    const msgRef = query(collection(chatRef, "messages"), orderBy("createdAt", "asc"))
    const scrollRef = useRef(null)

    function scrollToBottom() {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    useEffect(() => {
        const unsub = onSnapshot(msgRef, (doc) => {
            // doc.docs.map(d=>console.log(d.data().createdAt.seconds.todate()))
            setMessages(doc)
            console.log('run')
            scrollToBottom()
        })
        return () => {
            unsub()
        };
    }, [chat]);

    useEffect(() => {
        scrollToBottom()
    }, [messages, Messages])

    const sendMessage = async (e) => {
        await addDoc(collection(chatRef, "messages"), {
            text: text,
            from: chat.users.filter(u => u.email === user?.email)[0],
            to: chat.users.filter(u => u.email !== user?.email),
            createdAt: Timestamp.now()
        });
        scrollToBottom()

    }

    const showMessages = () => {
        if (Messages) {
            return Messages.docs?.map(msg => <Message type={'groups'} key={msg.id} data={{ ...msg.data(), createdAt: msg.data().createdAt?.toDate().getTime() }} user={user} />)
        }
        else {
            return messages.map(msg => <Message type={'groups'} key={msg.id} data={msg} user={user} />)
        }
        // return Messages?.docs?.map(msg => <Message key={msg.id} data={msg.data()} user={user} />)
    }



    return (
        <div className={styles.chatPg}>
            <div className={styles.chatProfile}>
                <Link href="/"><ArrowBackIcon className={styles.arrowBack} /></Link>
                <Avatar name={chat.groupName.slice(0, 2).toUpperCase()} bg={'#ff00ff'} />
                <div className={styles.friendInfo}>
                    <p style={{ marginBottom: 0, marginTop: 0,fontWeight:'bold' }}>{chat.groupName}</p>
                    <p style={{ marginBottom: 0, marginTop: 0, opacity: 0.7,fontSize:'0.8rem' }}>
                        {
                            chat.users.filter(u => u !== user?.email).map((user)=>{
                                return `${user.name},`
                            })
                        }
                    </p>
                </div>
            </div>
            <div className={styles.chatScreen}>
                {showMessages()}
                <div ref={scrollRef}></div>
            </div>
            <div className={styles.chatFooter}>
                <input onChange={e => setText(e.target.value)} value={text} className={styles.msgInput} type="text" placeholder='Type a message' />
                <button style={{ border: 'none' }} onClick={(e) => { sendMessage(e); setText('') }} disabled={!text}><SendIcon className={styles.sendIcon} /></button>
            </div>
        </div>
    )
}

export default GroupChatPg