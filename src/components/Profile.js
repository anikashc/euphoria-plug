import React from 'react'
import { Button, Card, Col, Image, Row } from 'antd';
import DashboardDataService from '../services/dashboard.services'

const Profile = ({profile}) => {
    const userId = localStorage.getItem('userId')

    const likeProfile = () => {
        console.log('like')
        DashboardDataService.addLike({
            likedBy: userId,
            likedTo: profile.id,
            createdAt: new Date().toISOString()
        })
        .then(res => {
            navigate('/dashboard')
        })
        .catch(err => {
            console.log(err)
        }) 
    }
    const dislikeProfile = () => {
        console.log('dislike')
        DashboardDataService.addDislike({
            dislikedBy: userId,
            dislikedTo: profile.id,
            createdAt: new Date().toISOString()
        })
        .then(res => {
            navigate('/dashboard')
        })
        .catch(err => {
            console.log(err)
        })
    }
    const starProfile = (profileId) => {
        console.log('staring')
        DashboardDataService.addFavourite(profileId,userId)
        .then(res => {
            navigate('/dashboard')
        })
        .catch(err => {
            console.log(err)
        }) 
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
                        <Button type="primary" onClick={likeProfile}>Like</Button>
                        <Button type="danger" onClick={dislikeProfile}>Dislike</Button>
                        <Button type="primary" onClick={(e)=>starProfile(profile.id)}>Star</Button>
                    </Col>
                </Row>

            </Card>
        
        </div>
    )
}

export default Profile