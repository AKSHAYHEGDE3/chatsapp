import React, { useEffect, useState } from "react";
import { auth, registerWithEmailAndPassword } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from '../styles/Login.module.css'
import Link from "next/link";
import Router from 'next/router'

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
   
  };

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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="username"
        />
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
          onClick={register}
        >
          Register
        </button>
        
        <div>
          Already have an account? <Link href="/login">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;