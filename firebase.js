import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    setDoc,doc,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyB2n78zEfnYuddqR3ecUJD8J95m_papD6s",
    authDomain: "chatsapp-114ff.firebaseapp.com",
    projectId: "chatsapp-114ff",
    storageBucket: "chatsapp-114ff.appspot.com",
    messagingSenderId: "1030031471064",
    appId: "1:1030031471064:web:1fd8250e1f50b54558c2ad",
    measurementId: "G-G9MX97V4PV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signinWithEmailAndPassword = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        const error = err.message;
        return error;
    }
};

const getAllUsers = async () => {
    const users =[]
    const querySnapshot = await getDocs(collection(db, "users"));
    //console.log(querySnapshot)
    querySnapshot.forEach(doc => {
        console.log(doc.data());
        users = users.concat(doc.data());
        
    })
    return users
    
}

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        // await addDoc(collection(db, "users",user.email), {
            await setDoc(doc(db, "users",user.email), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });

    } catch (err) {
        console.error(err);
        alert(err.message);

    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,collection,where,query,setDoc,doc,addDoc,getDocs,
    signinWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    getAllUsers
};