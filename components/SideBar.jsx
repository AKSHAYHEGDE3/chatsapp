import React, { useState } from 'react'
import styles from '../styles/Sidebar.module.css'
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../firebase';
import { useEffect } from 'react';
import { getAllUsers } from '../firebase.js'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, where, query, collection, setDoc, doc, addDoc, getDocs } from "../firebase.js";
import { useCollection } from "react-firebase-hooks/firestore";
import FriendCard from './FriendCard';
import Link from "next/link";
import SearchCard from './SearchCard';
import { queryEqual } from 'firebase/firestore';


const SideBar = () => {

    const [user, loading, error] = useAuthState(auth);
    const [users, setUsers] = useState(null)
    const [search, setSearch] = useState('')
    const [searchList, setSearchList] = useState([])
    const [chats, setChats] = useState([])

    // useEffect(() => {
    //     if (!user) {
    //         Router.push('/login')
    //       }
    // },[])

    // console.log(user)

    useEffect(
        () => {
            const getUsers = async () => {
                const res = await getAllUsers()
                // console.log(res)
                setUsers(res)
            };
            getUsers();
            const getChatsLists = async () => {
                // console.log(user)
                const userChatRef = query(collection(db, "chats"), where("users", "array-contains", user?.email));
                const querySnapshot = await getDocs(userChatRef);
                // querySnapshot.forEach((doc) => {
                //     console.log(doc.id, " => ", doc.data());
                // });
                setChats(querySnapshot.docs)

            }
            user && getChatsLists() ;
        }, [user])

    const searchUser = (e) => {
        setSearch(e.target.value);
        const expr = new RegExp(search, "gi");
        const lists = users.filter((elem) => expr.test(elem.email));
        setSearchList(lists)
        //console.log(searchLists);
    }

    const checkIfChatExist = (friend) => {
        return !!chats?.find(
            chat => chat.data().users.find(
                user => user === friend
            )?.length > 0
        )
    }

    const startChat = async (friend) => {
        console.log(!checkIfChatExist(friend))
        if (!checkIfChatExist(friend)) {
            console.log('run');
           const docref = await addDoc(collection(db, "chats"), {
                users: [user.email, friend],
            });
            // console.log(docref.id)
        }
        setSearch('')

    }

    
    
    return (
        <div className={styles.sidebar}>
            <div className={styles.profile}>
                <img src="/luffy.webp" alt="" />
                <LogoutIcon onClick={() => logout()} className={styles.logout} />
            </div>
            <div className={styles.search}>
                <input onChange={(e) => searchUser(e)} type="text" placeholder='search user using email' />
            </div>
            {
                !(search.length < 1) ?
                    <div className={styles.searchFriend}>
                        {
                            searchList?.map(user => {
                                return <SearchCard key={user.uid} user={user} startChat={startChat} id={card.id} />
                            })
                        }

                    </div> : ''
            }
            {
                (search.length < 1) ?
                        chats?.map((card)=>{
                            return <FriendCard key={card.id} data={card.data()} id={card.id} user={user}  />
                        })
                    : ''
            }
           
        </div>
    )
}

export default SideBar


