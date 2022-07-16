import React, { useEffect, useState } from "react";
import { auth, signinWithEmailAndPassword } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from '../styles/Login.module.css'
import Link from "next/link";
import Router from 'next/router'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);

    const login = async () => {
       const res = await signinWithEmailAndPassword(email, password)
    }

    const testLogin = async () => {
        const res = await signinWithEmailAndPassword('akshay@gmail.com', '123456')  
     }

    useEffect(()=>{
        if(user){
            Router.push('/')
        }
    },[user])

  

    return (
        <div className={styles.login}>
            <div className={styles.login__container}>
                <img className={styles.whatsappImg} src="/WhatsApp.png" alt="" />
                <input
                    type="text"
                    className={styles.login__textBox}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className={styles.login__textBox}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    className={styles.login__btn}
                    onClick={login}>
                    Login
                </button>
                <h4 style={{marginTop:'5%'}}>OR</h4>
                <button
                    className={styles.login__btn}
                    style={{backgroundColor:'red'}}
                    onClick={testLogin}>
                    Test Login
                </button>

                <div>
                    <Link href="/">Forgot Password</Link>
                </div>
                <div>
                    Don&apos;t have an account? <Link href="/register"><span style={{color:'blue',textDecoration:'underline',cursor:'pointer'}}>Register</span></Link> now.
                </div>
            </div>
        </div>
    );
}
export default Login;