import '../styles/globals.css'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from '../firebase';
import Login from './login';
import { useEffect } from 'react';
import { doc, setDoc, Timestamp, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { getAuth, } from "firebase/auth";
import Router from 'next/router'
import { useState } from 'react'


function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);
  const au = getAuth()


  useEffect(() => {
  
    if (!user ) {
      Router.push('/login')
    }
    
    const updateUser = async () => {
      const userRef = doc(db, "users", user.email);
      await updateDoc(userRef, {
        lastseen: Timestamp.now()
      });
    }
    if (user) {
      updateUser();

    }

  }, [user])

  if(loading) return <h1>Loading ... </h1>
  return <Component {...pageProps} />
}

export default MyApp
