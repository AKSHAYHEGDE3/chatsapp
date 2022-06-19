import Router from 'next/router';
import React from 'react'
import styles from '../styles/Sidebar.module.css'

const FriendCard = ({data,user,id}) => {

    function getRecepient(emails,user){
        return emails.users.filter(email=>email !== user?.email)[0];
     }
     const friend = getRecepient(data,user)
    //  console.log(friend)

    function letsChat(){
        Router.push(`/chat/${id}`)
    }

    return (

        <div onClick={letsChat} className={styles.friendCard}>
            <div className={styles.friendImg}>
                <img src="/luffy.webp" alt="" />
            </div>
            <p>{friend}</p>
        </div>

    )
}

export default FriendCard