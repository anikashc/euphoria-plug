import React, {useState} from 'react'
import { Button, Card, Col, Row, Avatar } from 'antd';
import DashboardDataService from '../services/dashboard.services'
import { useDispatch,useSelector } from 'react-redux';
import { setProfile, setProfiles, setFavourites} from '../actions/dashboardActions';

const { Meta } = Card;
const Favourite = ({profile}) => {
    const dispatch = useDispatch()
    const userProfile = useSelector((state) => state.profile)
    const [isLoading, setIsLoading]  = useState(false)
    const userId = localStorage.getItem('userId')
    
    const dislikeProfile = async (dislikedUserId) => {
        const dispatch = useDispatch
        setIsLoading(true)
        console.log('dislike')
        const data = await DashboardDataService.dislikeProfile(dislikedUserId)
        const myProfile = data.docs.find(profile => profile.id === userId)
        const otherProfiles = data.docs.filter(doc => doc.id !== userId);    
        dispatch(setProfiles(otherProfiles.map(doc => (  
            {...doc.data(), id: doc.id} 
        ))))
        dispatch(setProfile(myProfile.data()))
        setIsLoading(false)
    }

    const unDislikeProfile = async (dislikedUserId) => {
        setIsLoading(true)
        console.log('dislike')
        const data = await DashboardDataService.unDislikeProfile(dislikedUserId)
        const myProfile = data.docs.find(profile => profile.id === userId)
        const otherProfiles = data.docs.filter(doc => doc.id !== userId);    
        dispatch(setProfiles(otherProfiles.map(doc => (  
            {...doc.data(), id: doc.id} 
        ))))
        dispatch(setProfile(myProfile.data()))
        setIsLoading(false)
    }

    const likeProfile = async (likedUserId) => {
        setIsLoading(true)
        console.log('like')
        const data = await DashboardDataService.likeProfile(likedUserId)
        const myProfile = data.docs.find(profile => profile.id === userId)
        const otherProfiles = data.docs.filter(doc => doc.id !== userId);    
        dispatch(setProfiles(otherProfiles.map(doc => (  
            {...doc.data(), id: doc.id} 
        ))))
        dispatch(setProfile(myProfile.data()))
        setIsLoading(false)
    }

    const unLikeProfile = async (likedUserId) => {
        setIsLoading(true)
        console.log('unlike')
        const data = await DashboardDataService.unLikeProfile(likedUserId)
        const myProfile = data.docs.find(profile => profile.id === userId)
        const otherProfiles = data.docs.filter(doc => doc.id !== userId);    
        dispatch(setProfiles(otherProfiles.map(doc => (  
            {...doc.data(), id: doc.id} 
        ))))
        dispatch(setProfile(myProfile.data()))
        setIsLoading(false)

    }

    const unStarProfile = async (profile) => {
        setIsLoading(true)
        console.log('unstar')
        const data = await DashboardDataService.unFavouriteProfile(profile)
        const myProfile = data.docs.find(profile => profile.id === userId)
        const otherProfiles = data.docs.filter(doc => doc.id !== userId);    
        dispatch(setProfiles(otherProfiles.map(doc => (  
            {...doc.data(), id: doc.id} 
        ))))
        dispatch(setProfile(myProfile.data()))
        dispatch(setFavourites(myProfile.data().favourites))
        setIsLoading(false)
    }

    return (

        <div>
            <Card
                hoverable={true}
                style={{ width: 300, margin: '15',}}
                
                actions={[
                    userProfile.liked.includes(profile.id) ?
                        <Button type="danger" loading={isLoading} onClick={() => unLikeProfile(profile.id)}>Unlike</Button>
                        :
                        <Button type="primary" loading={isLoading} onClick={() => likeProfile(profile.id)}>Like</Button>
                    ,
                    userProfile.disliked.includes(profile.id) ?
                        <Button type="danger" loading={isLoading} onClick={() => unDislikeProfile(profile.id)}>Un-Dislike</Button>
                        :
                        <Button type="primary" loading={isLoading} onClick={() => dislikeProfile(profile.id)}>Dislike</Button>
                    ,
                    <Button type="danger" loading={isLoading} onClick={(e) => unStarProfile(profile)}>Unstar</Button>
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

export default Favourite