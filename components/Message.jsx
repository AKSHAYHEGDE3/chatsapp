import React from 'react'
import styles from '../styles/message.module.css'
import moment from "moment"
import timeSince from './helperFunction'

const Message = ({ data, user, }) => {

    // console.log(moment(data.createdAt.toDate()).format('LT'))

    return (
        <div>
            {
                data?.from !== user?.email ?
                    <div className={styles.msg}>
                        <div className={styles.bubble}>
                            <div className={styles.txt}>
                                <span className={styles.timestamp}>{moment(data?.createdAt).format('LT')}</span><br />
                                <span className={styles.message}>
                                    {data.text}
                                </span>

                            </div>
                        </div>
                    </div> :

                    <div className={styles.msg}>
                        <div className={`${styles.bubble} ${styles.my}`}>
                            <div className={styles.txt}>
                                <span className={styles.timestamp}>{moment(data?.createdAt).format('LT')}</span><br />
                                <p className={styles.message}>{data.text}</p>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Message