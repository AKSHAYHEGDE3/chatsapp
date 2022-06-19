import React from 'react'
import styles from '../styles/Sidebar.module.css'
import Router from 'next/router';

const SearchCard = ({user,startChat}) => {

    function letsChat(){
        startChat(user.email)
        
    }

    return (
        <div className={styles.friendCard}>
            <div className={styles.friendImg}>
                <img src="/luffy.webp" alt="" />
            </div>
            <p style={{ color: 'white' }}>{user.email}</p>
            <button onClick={() =>letsChat()} className={styles.searchCardBtn}>Chat</button>
        </div>
    )
}

export default SearchCard