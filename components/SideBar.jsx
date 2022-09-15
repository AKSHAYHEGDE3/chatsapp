import React, { useState } from 'react'
import styles from '../styles/Sidebar.module.css'
import LogoutIcon from '@mui/icons-material/Logout';
import GroupsIcon from '@mui/icons-material/Groups';
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
import ChatIcon from '@mui/icons-material/Chat';
import { Button } from '@mui/material';
import GroupModal from './GroupModal';

const SideBar = ({ type }) => {

    const [user, loading, error] = useAuthState(auth);
    const [users, setUsers] = useState(null)
    const [search, setSearch] = useState('')
    const [searchList, setSearchList] = useState([])
    const [chats, setChats] = useState([])
    const [groupChats, setGroupChats] = useState([])
    const [loader, setLoader] = useState(true)
    const [searchFound, setSearchFound] = useState(false)
    const [alreadyExist, setAlredyExist] = useState('')
    const [open, setOpen] = useState(false);

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
                const userChatRef = query(collection(db, "chats"), where("users", "array-contains", user?.email));
                const querySnapshot = await getDocs(userChatRef);
                let arr = []
                querySnapshot.docs.map(doc => {
                    arr = arr.concat({ users: doc.data().users, id: doc.id })
                })
                setLoader(false)
                setChats(arr);
            }

            const getGroupChatsLists = async () => {
                const userGroupChatRef = query(collection(db, "groupChats"), where("userEmails", "array-contains", user?.email));
                const querySnapshot = await getDocs(userGroupChatRef);
                // console.log(querySnapshot.docs)
                let arr = []
                querySnapshot.docs.map(doc => {
                    arr = arr.concat({ users: doc.data().users, userEmails: doc.data().userEmails, groupName: doc.data().groupName, id: doc.id })
                })
                setGroupChats(arr);
            }

            user && getChatsLists();
            user && getGroupChatsLists();

        }, [user])


    const searchUser = (e) => {
        setAlredyExist('')
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
            const docref = await addDoc(collection(db, "chats"), {
                users: [user.email, friend],
            });
            // console.log(docref.id)
            setChats([...chats, { users: [user.email, friend], id: docref.id }])
            setSearch('')
            setSearchList([])
            Router.push(`/chat/${docref.id}`)
        } else {
            setAlredyExist(`${friend} already in your chats`)
        }
    }


    return (
        <div className={styles.sidebar}>
            <div className={styles.profile}>
                {/* <img src="/luffy.webp" alt="" /> */}
                <Avatar name={user?.email.slice(0, 2).toUpperCase()} />
                <p className={styles.name}>{user?.email}</p>
                <div style={{ marginLeft: 'auto' }}>
                    <div style={{ display: 'flex' }}>
                        {
                            type === "chats" ?
                                <Link href='/groups/groups'>
                                    <div className={styles.group}>
                                        <GroupsIcon />
                                        <div style={{ fontSize: '0.7rem' }}>Groups</div>
                                    </div>
                                </Link> :
                                <Link href='/'>
                                    <div className={styles.group}>
                                        <ChatIcon />
                                        <div style={{ fontSize: '0.7rem' }}>chats</div>
                                    </div>
                                </Link>
                        }
                        <div className={styles.logout}>
                            <LogoutIcon onClick={() => logout()} />
                            <div style={{ fontSize: '0.7rem' }}>logout</div>
                        </div>
                    </div>
                </div>
            </div>
            {
                type === "chats" ?
                    <div className={styles.search}>
                        <input onChange={(e) => searchUser(e)} value={search} type="text" placeholder='search user using email' />
                    </div> :
                    <div>
                        <Button onClick={() => setOpen(true)} style={{ backgroundColor: 'red', margin: '2% 5%', width: '90%' }} variant="contained">Create Group</Button>
                        <hr />
                    </div>
            }
            <div className={styles.cards}>
                {
                    type === 'chats' && (!(search.length < 1) ?
                        <div className={styles.searchFriend}>
                            {
                                !searchFound ?
                                    searchList?.map(user => {
                                        return <SearchCard key={user.uid} user={user} type={type} startChat={startChat} />
                                    }) : <div style={{ marginTop: '4%', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        <p>Email does not Exist</p>
                                    </div>
                            }
                            <p style={{ color: 'red', textAlign: 'center' }}>{alreadyExist}</p>

                        </div> : '')
                }
                {
                    loader ?
                        <div style={{ marginTop: '4%', textAlign: 'center' }}>
                            <img src="/loader.gif" alt="" />
                        </div> :
                        type === 'chats' ?
                            (search.length < 1) ?
                                chats.length >= 1 ?
                                    chats?.map((card) => {
                                        return <FriendCard key={card.id} type={type} data={card} id={card.id} user={user} />
                                    }) : <div style={{ marginTop: '4%', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        <p>To start a conversation search your friends</p>
                                    </div>
                                :
                                ''
                            :
                            groupChats.length >= 1 ?
                            groupChats?.map((card) => {
                                    return <FriendCard key={card.id} type={type} data={card} id={card.id} user={user} />
                                }) : <div style={{ marginTop: '4%', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                    <p>No Groups! Create One</p>
                                </div>
                }
            </div>
            <GroupModal
                open={open}
                setOpen={setOpen}
                setGroupChats={setGroupChats}
                users={users}
                groupChats={groupChats}
                user={user}
            />
        </div>
    )
}

export default SideBar


