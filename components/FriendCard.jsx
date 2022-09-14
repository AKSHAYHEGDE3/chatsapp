import Router from 'next/router';
import React from 'react'
import styles from '../styles/Sidebar.module.css'
import Avatar from './Avatar';


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

        <div onClick={letsChat} className={`${styles.friendCard} ${styles.searchCard}`}>
            <Avatar name={friend.slice(0,2).toUpperCase()}/>
            <p style={{marginLeft:'2%'}}>{friend}</p>
        </div>

    )
}

export default FriendCard