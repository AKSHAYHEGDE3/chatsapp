import React from 'react'
import Navbar from '../../components/Navbar'
import SideBar from '../../components/SideBar'
import styles from "../../styles/Home.module.css"

const Groups = () => {
    return (
        <div>
            <Navbar />
            <div style={{
                display: 'flex'
            }}>
                <div style={{maxHeight:'95vh',height:'95vh'}} className={styles.side}>
                    <SideBar type={"groups"} />
                </div>
                <div className={styles.mainChat}>
                    <div style={{
                        backgroundColor: "#f0f2f5",
                        height: '93vh',
                        maxHeight: '95vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div>
                            <div>start your chats by clicking on Name</div>
                            <div style={{ textAlign: 'center' }}>Or</div>
                            <div style={{ textAlign: 'center' }}>Create a Group</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Groups