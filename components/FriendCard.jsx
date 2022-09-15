import Router from 'next/router';
import React from 'react'
import styles from '../styles/Sidebar.module.css'
import Avatar from './Avatar';


const FriendCard = ({ data, user, id, type }) => {

    function getRecepient(emails, user) {
        return emails.users.filter(email => email !== user?.email)[0];
    }
    const friend = type==='chats' && getRecepient(data, user)
    //  console.log(friend)


    // console.log(data,type);
    return (
        <div>
            {
                type === 'chats' ?
                    <div onClick={()=> Router.push(`/chat/${id}`)} className={`${styles.friendCard} ${styles.searchCard}`}>
                        <Avatar name={friend.slice(0, 2).toUpperCase()} />
                        <p style={{ marginLeft: '2%' }}>{friend}</p>
                    </div> :
                    <div onClick={()=> Router.push(`/groups/${id}`)} className={`${styles.friendCard} ${styles.searchCard}`}>
                        <Avatar name={data.groupName.slice(0, 2).toUpperCase()} />
                        <p style={{ marginLeft: '2%' }}>{data.groupName}</p>
                    </div>
            }
        </div>

    )
}

export default FriendCard