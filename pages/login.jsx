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

    useEffect(()=>{
        if(user){
            Router.push('/')
        }
    },[user])

  

    return (
        <div className={styles.login}>
            <div className={styles.login__container}>
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

                <div>
                    <Link href="/">Forgot Password</Link>
                </div>
                <div>
                    Don't have an account? <Link href="/register">Register</Link> now.
                </div>
            </div>
        </div>
    );
}
export default Login;