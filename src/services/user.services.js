import {db} from '../firebase'
import { collection, getDocs, getDoc, updateDoc, doc , setDoc,query, orderBy } from 'firebase/firestore'
const userCollectionRef  = collection(db, 'users')
class UserDataService {
    addUser = (user) =>{
        return setDoc(doc(userCollectionRef, user.id), user);
    }
    getUser=(userId) =>{
        const userDoc = doc(db,'users', userId)
        return getDoc(userDoc)
    }
    getUsers = (userId) => {
        const q = query(userCollectionRef,orderBy("likes", "desc"));
        return getDocs(q)
    }
    updateUser = (userId, updatedUser)=> {
        const userDoc = doc(db,'users', userId)
        return updateDoc(userDoc, updatedUser) 
    }
    
}

export default new UserDataService()