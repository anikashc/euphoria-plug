import {db} from '../firebase'
import { collection, getDocs, getDoc, updateDoc, deleteDoc, addDoc, doc, query, where, increment, arrayUnion, arrayRemove  } from 'firebase/firestore'
const userRefCollection = collection(db, 'users')
const userId = localStorage.getItem('userId')
class DashboardDataService {

    // update the status of the user
    updateStatus = (userId, status) =>{
        const userDoc = doc(db,'users', userId)
        updateDoc(userDoc, status)
        console.log('status updated')
        return getDoc(userDoc)
    }
    
    dislikeProfile = (dislikeId) => {
        // increment the dislike count and add the profile to the list of dislikes
        const dislikeDoc = doc(db,'users', dislikeId)
     
        updateDoc(dislikeDoc, {
            dislikes: increment(1)
        })
        const userDoc = doc(db,'users', userId)

        updateDoc(userDoc, {
            disliked: arrayUnion(dislikeId)
        })
        return getDocs(userRefCollection) 
    }

    unDislikeProfile = (dislikeId) => {
        const dislikeDoc = doc(db,'users', dislikeId)
     
        updateDoc(dislikeDoc, {
            dislikes: increment(-1)
        })
        const userDoc = doc(db,'users', userId)

        updateDoc(userDoc, {
            disliked: arrayRemove(dislikeId)
        })
        return getDocs(userRefCollection) 
    }

    likeProfile = (likeId) => {
        // increment the like count and add the profile to the list of likes
        const likeDoc = doc(db,'users', likeId)
     
        updateDoc(likeDoc, {
            likes: increment(1)
        })
        const userDoc = doc(db,'users', userId)

        updateDoc(userDoc, {
            liked: arrayUnion(likeId)
        })
        return getDocs(userRefCollection) 
    }

    unLikeProfile = (likeId) => {
        const likeDoc = doc(db,'users', likeId)
     
        updateDoc(likeDoc, {
            likes: increment(-1)
        })
        const userDoc = doc(db,'users', userId)

        updateDoc(userDoc, {
            liked: arrayRemove(likeId)
        })
        return getDocs(userRefCollection) 
    }

    favouriteProfile = (profile) => {
        const userDoc = doc(db,'users', userId)
        

        updateDoc(userDoc, {
            favourites: arrayUnion(profile)
        })
        return getDocs(userRefCollection) 
    }

    unFavouriteProfile = (profile) => {
        const userDoc = doc(db,'users', userId)
        
        updateDoc(userDoc, {
            favourites: arrayRemove(profile)
        })
        return getDocs(userRefCollection) 
    }
}

export default new DashboardDataService()