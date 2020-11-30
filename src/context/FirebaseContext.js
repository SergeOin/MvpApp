import React, {createContext} from 'react'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import config from '../config/firebase'
import {Type} from "react-native/ReactCommon/hermes/inspector/tools/msggen/src/Type";

const FirebaseContext = createContext();
if(!firebase.apps.length) {
    firebase.initializeApp(config)
}

const db = firebase.firestore();

const Firebase = {
    getCurrentUser: () => {
        return firebase.auth().currentUser
    },
    createUser: async (user) => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            const uid = Firebase.getCurrentUser().uid;
            let profilePhotoUrl = "default"
            await db.collection("users").doc(uid).set({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                profilePhotoUrl
            })
            if (user.profilePhoto){
                profilePhotoUrl = await Firebase.uploadProfilePhoto(user.profilePhoto)
            }
            delete user.password
            return {...user, profilePhotoUrl, uid}
        } catch (error){
            console.log("Error @createUser: ", error.message)
        }
    },
    uploadProfilePhoto: async (uri) => {
        const uid = Firebase.getCurrentUser().uid;
        try {
            const photo = await Firebase.getBlob(uri)
            const imageRef = firebase.storage().ref("profilePhotos").child(uid)
            await imageRef.put(photo)

            const url = await imageRef.getDownloadURL()
            await db.collection("users").doc(uid).update({
                profilePhotoUrl: url
            })
            return url
        }catch (error) {
            console.log("Error @uploadProfilePhoto: ", error)
        }
    },
    getBlob: async (uri) => {
        return await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.onload = () => {
                resolve(xhr.response)
            }
            xhr.onerror = () => {
                reject(new TypeError("Erreur de la demande réseau"))
            }
            xhr.responseType = "blob"
            xhr.open("GET", uri, true)
            xhr.send(null)
        })
    },

    getUserInfo: async (uid) => {
        try {
            const user = await db.collection("user").doc(uid).get()
            if (user.exists){
                return user.data()
            }
        } catch (error) {
            console.log("Error @getUserInfo: ", error)
        }
    },

    logOut: async () => {
        try {
            await firebase.auth().signOut()
            return true

        } catch (error) {
            console.log("Error @logOut: ", error)
        }
        return false
    },
    signIn: async (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
    }
}

const FirebaseProvider = (props) => {
    return <FirebaseContext.Provider value={Firebase}>{props.children}</FirebaseContext.Provider>
}

export {FirebaseContext, FirebaseProvider}