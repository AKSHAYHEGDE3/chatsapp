import Head from 'next/head'
import Image from 'next/image'
import SideBar from '../components/SideBar'
import styles from '../styles/Home.module.css'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from '../firebase';
import Chatpg from '../components/Chatpg';
import Navbar from '../components/Navbar';





export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  if(loading){
    return <h1>Loading ...</h1>
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Chatsapp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <SideBar />
      



    </div>
  )
}
