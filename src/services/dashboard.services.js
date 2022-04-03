import {db} from '../firebase'
import { collection, getDocs, getDoc, updateDoc, deleteDoc, addDoc, doc, query, where  } from 'firebase/firestore'
const likesCollectionRef  = collection(db, 'likes')
const favouritesCollectionRef  = collection(db, 'favourites')
const dislikesCollectionRef  = collection(db, 'dislikes')
class DashboardDataService {

    // update the status of the 
    updateStatus = (userId, status) =>{
        const userDoc = doc(db,'users', userId)
        return updateDoc(userDoc, status)
    }
    addLike= (liked)=> {
        const {likedTo} = liked
        const userDoc = doc(db,'users', likedTo)
        getDoc(userDoc)
        .then (data => {
            // increment the number of dislikes
            console.log(data.data())
            updateDoc(userDoc, {likes: data.data().likes + 1})
            .then(() => {
                return addDoc(likesCollectionRef, liked)
            })
        })
    }
    addFavourite= (favouriteId,userId)=> {
        // check if favourite list for the user exists and if not create one
        const q = query(favouritesCollectionRef, where('user', '==', userId));
        getDocs(q)
        .then(data => {
            console.log(data.docs)
            if(data.docs.length === 0){
                addDoc(favouritesCollectionRef, {user: userId, favourites: [favouriteId]})
            }else{
                if(!data.docs[0].data().favourites.includes(favouriteId)){
                    const favouriteDoc = doc(db,'favourites', data.docs[0].id)
                    // console.log(favouriteDoc.data())
                    updateDoc(favouriteDoc, {favourites: [...data.docs[0].data().favourites, favouriteId]})
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    getFavourites =(userId) => {
        const q = query(favouritesCollectionRef, where('user', '==', userId));
        return getDocs(q)
    }
    
    addDislike=(disliked)=> {
        const {dislikedTo} = disliked
        const userDoc = doc(db,'users', dislikedTo)
        getDoc(userDoc)
        .then (data => {
            // increment the number of dislikes
            console.log(data.data())
            updateDoc(userDoc, {dislikes: data.data().dislikes + 1})
            .then(() => {
                return addDoc(dislikesCollectionRef, disliked)
            })
        })
    }
    getLikes = () => {
        return getDocs(likesCollectionRef)
    }
    getDislikes = () => {
        return getDocs(dislikesCollectionRef)
    }
    getLikesToUserId = (userId) => {
        const q = query(likesCollectionRef, where('likedTo', '==', userId));
        
        return getDocs(q)
    }
    getDislikesToUserId = (userId) => {
        const q = query(dislikesCollectionRef, where('dislikedTo', '==', userId));
        return getDocs(q)
    }
}

export default new DashboardDataService()