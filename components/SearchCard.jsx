import React from 'react'
import styles from '../styles/Sidebar.module.css'

const SearchCard = ({user,startChat}) => {


    return (
        <div className={styles.friendCard}>
            <div className={styles.friendImg}>
                <img src="/luffy.webp" alt="" />
            </div>
            <p style={{ color: 'white' }}>{user.email}</p>
            <button onClick={() => startChat(user.email)} className={styles.searchCardBtn}>Chat</button>
        </div>
    )
}

export default SearchCard