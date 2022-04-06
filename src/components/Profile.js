import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Image, Row, Avatar } from 'antd';
import DashboardDataService from '../services/dashboard.services'
// import useStore from '../store/indexOld';
import { setProfile, setProfiles, setFavourites} from '../actions/dashboardActions';
const { Meta } = Card;

const Profile = ({profile}) => {
    const dispatch = useDispatch()
    const userProfile = useSelector((state) => state.profile)
    // const setProfile = useStore((state) => state.setProfile)
    // const setProfiles = useStore((state) => state.setProfiles)
    // const setFavourites = useStore((state) => state.setFavourites)
    const userId = localStorage.getItem('userId')


    const dislikeProfile = async (dislikedUserId) => {
        console.log('dislike')
        const data = await DashboardDataService.dislikeProfile(dislikedUserId)
        const myProfile = data.docs.find(profile => profile.id === userId)
        const otherProfiles = data.docs.filter(doc => doc.id !== userId);    
        dispatch(setProfiles(otherProfiles.map(doc => (  
                {...doc.data(), id: doc.id} 
            ))))
        dispatch (setProfile(myProfile.data()))
    }

    const likeProfile = async (likedUserId) => {
        console.log('like')
        const data = await DashboardDataService.likeProfile(likedUserId)
        const myProfile = data.docs.find(profile => profile.id === userId)
        const otherProfiles = data.docs.filter(doc => doc.id !== userId);    
        dispatch(setProfiles(otherProfiles.map(doc => (  
                {...doc.data(), id: doc.id} 
            ))))
        dispatch (setProfile(myProfile.data()))
    }
    const unLikeProfile = async (likedUserId) => {
        console.log('unlike')
        const data = await DashboardDataService.unLikeProfile(likedUserId)
        const myProfile = data.docs.find(profile => profile.id === userId)
        const otherProfiles = data.docs.filter(doc => doc.id !== userId);    
        dispatch(setProfiles(otherProfiles.map(doc => (  
                {...doc.data(), id: doc.id} 
            ))))
        dispatch (setProfile(myProfile.data()))
    }
    const unDislikeProfile = async (dislikedUserId) => {
        console.log('dislike')
        const data = await DashboardDataService.unDislikeProfile(dislikedUserId)
        const myProfile = data.docs.find(profile => profile.id === userId)
        const otherProfiles = data.docs.filter(doc => doc.id !== userId);    
        dispatch(setProfiles(otherProfiles.map(doc => (  
                {...doc.data(), id: doc.id} 
            ))))
        dispatch (setProfile(myProfile.data()))
    }
    const starProfile = async (profile) => {
        console.log('star')
        const data = await DashboardDataService.favouriteProfile(profile)
        const myProfile = data.docs.find(profile => profile.id === userId)
        const otherProfiles = data.docs.filter(doc => doc.id !== userId);    
        dispatch(setProfiles(otherProfiles.map(doc => (  
                {...doc.data(), id: doc.id} 
            ))))
        dispatch (setProfile(myProfile.data())) 
        dispatch(setFavourites(myProfile.data().favourites))
    }
    return (

        <div>

            <Card
                style={{ width: 300, margin: '15',}}
                hoverable={true}
                actions={[
                    userProfile.liked.includes(profile.id) ?
                        <Button type="danger" onClick={() => unLikeProfile(profile.id)}>Unlike</Button>
                        :
                        <Button type="primary" onClick={() => likeProfile(profile.id)}>Like</Button>
                    ,
                    userProfile.disliked.includes(profile.id) ?
                        <Button type="danger" onClick={() => unDislikeProfile(profile.id)}>Un-Dislike</Button>
                        :
                        <Button type="primary" onClick={() => dislikeProfile(profile.id)}>Dislike</Button>
                    ,
                    <Button type="primary" onClick={(e)=>starProfile(profile)}>Star</Button>
                ]}
            >
                <Meta
                avatar={<Avatar shape="square" src={profile.photo} alt={profile.name} />}
                title={profile.name}
                description={profile.status}
                />
            </Card>
        
        </div>
    )
}

export default Profile