import React, { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPhoneNumber, signInWithPopup, signOut, updateEmail, updatePassword, updateProfile} from "firebase/auth";
import axios from 'axios';

const auth = getAuth(app);
export const UserAuth = createContext(null);

const Auth = ({children}) => {
    const [pickPointData,setPickPointData]=useState(null)
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleIn =()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const facebookIn =()=>{
        setLoading(true);
        return signInWithPopup(auth, facebookProvider);
    }

    const passReset = (email) =>{
        return sendPasswordResetEmail(auth,email);
    }

    const updateUser = (loggedUser, name, photo) => {
        setLoading(true)
        return updateProfile(loggedUser, {
            displayName: name, photoURL: photo
        })
    }

    const updateUserName = (name) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: auth.currentUser.photoURL
        })
    }


    const updatePass = (newPassword) =>{
        setLoading(true);
        return updatePassword(auth.currentUser , newPassword);
    }

    const updateUserEmail = (newEmail) =>{
        setLoading(true);
        return updateEmail(auth.currentUser, newEmail)
    }

    const userVerify = ()=>{
        setLoading(true);
        return sendEmailVerification(auth.currentUser)
    }

    const PhoneVerificationCode = async (phoneNumber) => {
        try {
          console.log('Sending verification code...');
          setLoading(true);
          const confirmation = await signInWithPhoneNumber(auth, phoneNumber);
          setLoading(false);
          console.log('Verification code sent successfully:', confirmation.verificationId);
          return confirmation.verificationId;
        } catch (error) {
          console.error('Error sending verification code:', error);
          setLoading(false);
          throw new Error('Error sending verification code');
        }
      };
    
      const verifyNumber = async (confirmation, verificationCode) => {
        try {
          setLoading(true);
          const credential = await confirmation.confirm(verificationCode);
          setLoading(false);
          await signInWithPhoneNumber(auth, credential);
        } catch (error) {
          console.error('Error verifying phone number:', error);
          setLoading(false);
          throw new Error('Error verifying phone number');
        }
      };

    const logOut = () => {
        return signOut(auth)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)

            if (currentUser) {
                // const email= currentUser.email;
                axios.post("https://take-a-lot-server-two.vercel.app/jwt", {
                    email: currentUser.email
                }).then(data => {
                    // console.log(data.data.token);
                    localStorage.setItem("access-token", data.data.token)
                    setLoading(false)
                })
            } else {
                setLoading(false)
                localStorage.removeItem("access-token")
            }
        })
        return () => unsubscribe();
    }, [])




    const userInfo = {
        user,
        loading,
        signUp,
        signIn,
        passReset,
        googleIn,
        facebookIn,
        updateUser,
        updatePass,
        updateUserName,
        updateUserEmail,
        userVerify,
        logOut,
        setPickPointData,
        pickPointData,
        PhoneVerificationCode,
        verifyNumber
    }
    return (
       <UserAuth.Provider value={userInfo}>
          {children}
       </UserAuth.Provider>
    );
};

export default Auth;