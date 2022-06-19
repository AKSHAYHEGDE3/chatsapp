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
import Router from 'next/router';
import Avatar from './Avatar'


const SideBar = () => {

    const [user, loading, error] = useAuthState(auth);
    const [users, setUsers] = useState(null)
    const [search, setSearch] = useState('')
    const [searchList, setSearchList] = useState([])
    const [chats, setChats] = useState([])
    const [loader, setLoader] = useState(true)
    const [searchFound, setSearchFound] = useState(false)

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
                let arr = []
                querySnapshot.docs.map(doc => {
                    // console.log(doc.data());
                    arr = arr.concat({ users: doc.data().users, id: doc.id })
                })
                setLoader(false)
                setChats(arr);
            }
            user && getChatsLists();
        }, [user])

    const searchUser = (e) => {
        setSearch(e.target.value);
        const expr = new RegExp(search, "gi");
        const lists = users.filter((elem) => expr.test(elem.email));
        if (lists.length < 1) {
            setSearchFound(true)
        } else {
            setSearchFound(false)
            setSearchList(lists)
        }

        //console.log(searchLists);
    }

    const checkIfChatExist = (friend) => {
        return !!chats?.find(
            chat => chat.users.find(
                user => user === friend
            )?.length > 0
        )
    }


    const startChat = async (friend) => {
        // console.log('work')
        // console.log(!checkIfChatExist(friend))
        if (!checkIfChatExist(friend)) {
            console.log('run');
            const docref = await addDoc(collection(db, "chats"), {
                users: [user.email, friend],
            });
            console.log(docref.id)
            setChats([...chats, { users: [user.email, friend], id: docref.id }])
            setSearch('')
            setSearchList([])
            Router.push(`/chat/${docref.id}`)
        }
    }


    return (
        <div className={styles.sidebar}>
            <div className={styles.profile}>
                {/* <img src="/luffy.webp" alt="" /> */}
                <Avatar name={user?.email.slice(0, 2).toUpperCase()} />
                <p className={styles.name}>{user?.email}</p>
                <LogoutIcon onClick={() => logout()} className={styles.logout} />
            </div>
            <div className={styles.search}>
                <input onChange={(e) => searchUser(e)} value={search} type="text" placeholder='search user using email' />
            </div>
            <div className={styles.cards}>
                {
                    !(search.length < 1) ?
                        <div className={styles.searchFriend}>
                            {
                                !searchFound ?
                                    searchList?.map(user => {
                                        return <SearchCard key={user.uid} user={user} startChat={startChat} />
                                    }) : <div style={{ marginTop: '4%', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        <p>Email does not Exist</p>
                                    </div>
                            }

                        </div> : ''
                }
                {
                    loader ?
                        <div style={{ marginTop: '4%', textAlign: 'center' }}>
                            <img src="/loader.gif" alt="" />
                        </div> :
                        (search.length < 1) ?
                            chats.length >= 1 ?
                                chats?.map((card) => {
                                    return <FriendCard key={card.id} data={card} id={card.id} user={user} />
                                }) : <div style={{ marginTop: '4%', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                    <p>To start a conversation search your friends</p>
                                </div>
                            : ''
                }
            </div>
        </div>
    )
}

export default SideBar


