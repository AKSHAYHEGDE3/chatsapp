import React from 'react'
import styles from '../styles/Sidebar.module.css'
import Router from 'next/router';
import Avatar from './Avatar';
import RemoveIcon from '@mui/icons-material/Remove';

const SearchCard = ({ user, startChat, type, addMembers, setAddMembers }) => {

    function letsChat() {
        startChat(user.email)
    }

    // console.log(user);

    return (
        <div className={styles.friendCard}>
            <Avatar name={user.email.slice(0, 2).toUpperCase()} />
            <p style={{ color: 'white', marginLeft: '2%' }}>{
                user.email.length < 10 ?
                    user.email :
                    `${user.email.slice(0, 15)}...`
            }</p>
            {
                type === "chats" ?
                    <button onClick={() => letsChat()} className={styles.searchCardBtn}>Chat</button> :
                    addMembers.filter(u => u.email === user.email).length > 0 ?
                        <RemoveIcon onClick={() => setAddMembers(addMembers.filter(u => u.email !== user.email))} className={styles.searchCardBtn}
                            style={{ color: 'red', fontSize: '50px', backgroundColor: '#00a884', zIndex: 999 }} />
                        :
                        <button onClick={() => setAddMembers([...addMembers, user])} className={styles.searchCardBtn}>Add</button>
            }
        </div>
    )
}

export default SearchCard