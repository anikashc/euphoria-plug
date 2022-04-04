import React from 'react'
import { Button, Card, Col, Image, Row } from 'antd';
import DashboardDataService from '../services/dashboard.services'
import useStore from '../store';

const Favourite = ({profile}) => {
    const userProfile = useStore((state) => state.profile)
    const setProfile = useStore((state) => state.setProfile)
    const setProfiles = useStore((state) => state.setProfiles)
    const setFavourites = useStore((state) => state.setFavourites)
    const userId = localStorage.getItem('userId')
    
    const dislikeProfile = async (dislikedUserId) => {
        console.log('dislike')
        const data = await DashboardDataService.dislikeProfile(dislikedUserId)
        const myProfile = data.docs.find(profile => profile.id === userId)
        const otherProfiles = data.docs.filter(doc => doc.id !== userId);    
        setProfiles(otherProfiles.map(doc => (  
            {...doc.data(), id: doc.id} 
        )))
        setProfile(myProfile.data())
    }

    const unDislikeProfile = async (dislikedUserId) => {
        console.log('dislike')
        const data = await DashboardDataService.unDislikeProfile(dislikedUserId)
        const myProfile = data.docs.find(profile => profile.id === userId)
        const otherProfiles = data.docs.filter(doc => doc.id !== userId);    
        setProfiles(otherProfiles.map(doc => (  
            {...doc.data(), id: doc.id} 
        )))
        setProfile(myProfile.data())
    }

    const likeProfile = async (likedUserId) => {
        console.log('like')
        const data = await DashboardDataService.likeProfile(likedUserId)
        const myProfile = data.docs.find(profile => profile.id === userId)
        const otherProfiles = data.docs.filter(doc => doc.id !== userId);    
        setProfiles(otherProfiles.map(doc => (  
            {...doc.data(), id: doc.id} 
        )))
        setProfile(myProfile.data())
    }

    const unLikeProfile = async (likedUserId) => {
        console.log('unlike')
        const data = await DashboardDataService.unLikeProfile(likedUserId)
        const myProfile = data.docs.find(profile => profile.id === userId)
        const otherProfiles = data.docs.filter(doc => doc.id !== userId);    
        setProfiles(otherProfiles.map(doc => (  
            {...doc.data(), id: doc.id} 
        )))
        setProfile(myProfile.data())
    }

    const unStarProfile = async (profile) => {
        console.log('unstar')
        const data = await DashboardDataService.unFavouriteProfile(profile)
        const myProfile = data.docs.find(profile => profile.id === userId)
        const otherProfiles = data.docs.filter(doc => doc.id !== userId);    
        setProfiles(otherProfiles.map(doc => (  
            {...doc.data(), id: doc.id} 
        )))
        setProfile(myProfile.data()) 
        setFavourites(myProfile.data().favourites)
    }

    return (

        <div>
            <Card title={profile.name} bordered={false}>
                <Row>
                    <Col span={12}>
                        <Image
                            width={100}
                            src={profile.photo}
                            alt={profile.name}
                        />
                    </Col>
                    <Col span={12}>
                        <p>{profile.status}</p>
                        {userProfile.liked.includes(profile.id) ?
                            <Button type="danger" onClick={() => unLikeProfile(profile.id)}>Unlike</Button>
                            :
                            <Button type="primary" onClick={() => likeProfile(profile.id)}>Like</Button>
                        }
                        {userProfile.disliked.includes(profile.id) ?
                            <Button type="danger" onClick={() => unDislikeProfile(profile.id)}>Un-Dislike</Button>
                            :
                            <Button type="primary" onClick={() => dislikeProfile(profile.id)}>Dislike</Button>
                        }
                        <Button type="danger" onClick={(e) => unStarProfile(profile)}>Unstar</Button>
                    </Col>
                </Row>

            </Card>
        
        </div>
    )
}

export default Favourite