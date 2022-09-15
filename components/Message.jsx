import React from 'react'
import styles from '../styles/message.module.css'
import moment from "moment"
import timeSince from './helperFunction'

const Message = ({ data, user, type }) => {

    // console.log(moment(data.createdAt.toDate()).format('LT'))
    

    return (
        <div>
            {
               (type==='chats' ? data?.from :data?.from.email) !== user?.email ?
                    <div className={styles.msg}>
                        <div className={styles.bubble}>
                            <div className={styles.txt}>
                                <span className={styles.timestamp}>{type==="chats"?moment(data?.createdAt).format('LT'):data?.from.name}</span><br />
                                <span className={styles.message}>
                                    {data.text}
                                </span>
                                {type!== "chats" && <span className={styles.timestamp} style={{fontSize:'0.7rem',marginTop:'5px'}}>{moment(data?.createdAt).format('LT')}</span>}
                            </div>
                        </div>
                    </div> :

                    <div className={styles.msg}>
                        <div className={`${styles.bubble} ${styles.my}`}>
                            <div className={styles.txt}>
                                <span className={styles.timestamp}>{type==="chats"?moment(data?.createdAt).format('LT'):data?.from.name}</span><br />
                                <p className={styles.message}>{data.text}</p>
                               {type!== "chats" && <span className={styles.timestamp} style={{fontSize:'0.7rem',marginTop:'5px'}}>{moment(data?.createdAt).format('LT')}</span>}
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Message