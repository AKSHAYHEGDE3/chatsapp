import React, { useState } from 'react'
import { Modal, Box, TextField } from '@mui/material'
import styles from '../styles/Sidebar.module.css'
import SearchCard from './SearchCard';
import { Button } from '@mui/material';
import { auth, db, where, query, collection, setDoc, doc, addDoc, getDocs } from "../firebase.js";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    maxHeight:'70vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const GroupModal = ({
    open,
    setOpen,
    users,
    user,
    setGroupChats,
    groupChats
}) => {

    const [addMembers, setAddMembers] = useState([])
    const [search, setSearch] = useState('')
    const [searchList, setSearchList] = useState([])
    const [searchFound, setSearchFound] = useState(false)
    const [grpName, setGrpName] = useState('')

    const createGroup = async () => {
        const userEmails = [];
        addMembers.forEach(user=>userEmails=userEmails.concat(user.email))
        const docref = await addDoc(collection(db, "groupChats"), {
            users: [...addMembers,users.filter(u=>u.email===user.email)[0]],
            groupName:grpName,
            userEmails:[...userEmails,user.email],
        });
        setGroupChats([...groupChats, 
            { users: [...addMembers,users.filter(u=>u.email===user.email)[0]],
            userEmails:[...userEmails,user.email],
            groupName:grpName,
            id: docref.id 
        }])
        setSearch('')
        setSearchList([])
        setGrpName('')
        setAddMembers([])
    }

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
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField
                            value={grpName}
                            onChange={(e) => setGrpName(e.target.value)}
                            required style={{}} id="outlined-basic" label="Group Name" variant="outlined" />
                    </div>
                    <div style={{
                        color: "#818f98",
                        width: '90%',
                        border: 0,
                        margin: '2% auto',
                        padding: '0 1%',
                    }}>
                        <input onChange={(e) => searchUser(e)} value={search} style={{ width: '100%' }} type="text" placeholder='search user using email' />
                        {
                            (!search.length < 1) ?
                                <div className={styles.searchFriend}>
                                    {
                                        !searchFound ?
                                            searchList?.map(user => {
                                                return <SearchCard key={user.uid} user={user} type={'groups'} addMembers={addMembers} setAddMembers={setAddMembers} />
                                            }) : <div style={{ marginTop: '4%', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                                <p>Email does not Exist</p>
                                            </div>
                                    }

                                </div> : ''
                        }
                        <Button onClick={createGroup}
                         disabled={!(addMembers.length >= 1 && (grpName!==null && grpName!==''))} 
                         style={{ backgroundColor: 'red', margin: '2%', marginLeft: '70%' }} variant="contained">
                            Create Group
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default GroupModal