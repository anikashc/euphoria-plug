import React, {useEffect,useState} from 'react'
import { Input, Button,Col } from 'antd';
import { Typography } from 'antd';
import {db,auth} from '../firebase'
import { useNavigate } from 'react-router-dom';
import DashboardDataService from '../services/dashboard.services'
import UserDataServices from '../services/user.services'
import Profile from '../components/profile';
import {signOut } from "firebase/auth";
import { sortByKey } from '../utils';
import { doc } from 'firebase/firestore';

const { Title } = Typography;
const { TextArea } = Input;

const Dashboard = () => {
    const token = localStorage.getItem('token')
    const [userId, setUserId] = useState(localStorage.getItem('userId'))
    const [likedBy, setLikedBy] = useState(0)
    const [dislikedBy, setDislikedBy] = useState(0)
    let navigate = useNavigate();
    const [status, setStatus] = useState('')
    const [profiles, setProfiles] = useState([])
    const [myStatus, setMyStatus] = useState('')
    const [favourites, setFavourites] = useState([])


    const updateStatus = () =>{
        DashboardDataService.updateStatus(userId,{
            status: status
        })
        .then(res => {
            console.log(status)
            setStatus('')
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    const getMyLikes = () =>{
        DashboardDataService.getLikesToUserId(userId)
        .then(res => {
            setLikedBy(res.docs.length)
        })
        .catch(err => {
            console.log(err)
        })
        
    }
    const getMyDislikes = () =>{
        DashboardDataService.getDislikesToUserId(userId)
        .then(res => {
            setDislikedBy(res.docs.length)
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    const getProfiles = () => {
        UserDataServices.getUsers(userId)
        .then(data => {
            // remove self from list
            const result = data.docs.filter(doc => doc.id !== userId);

            
            setProfiles(result.map(doc => (
                
                {...doc.data(), id: doc.id} 
            )))
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getFavourites = () => {
        UserDataServices.getFavourites(userId)
        .then(data => {
            

            
            setFavourites(result.map(doc => (
                
                {...doc.data(), id: doc.id} 
            )))
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getMyProfile = () => {
        UserDataServices.getUser(userId)
        .then(data => {
            setMyStatus(data.data().status)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const signOutOfGoogle = () => {
        
        signOut(auth)
        .then(() => {
            localStorage.removeItem('token');
            navigate(`/`);
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        if(!token){
            navigate('/')
        }
        getProfiles()
        getMyLikes()
        getMyDislikes()
        getMyProfile()
    }, [token, setProfiles, navigate])

    return (
        <div>
            <Title level={2}>Dashboard</Title>
            {/* insert logout button */}
            <Button type="primary" onClick={signOutOfGoogle}>Logout</Button>
            <Title>What's your status?</Title>
            <TextArea rows={4} placeholder="Share your status..."
                onChange = {(e) => {
                    setStatus(e.target.value)
                }} 
            />
            <Button type="primary" onClick={() => {
                
                if(status){
                    updateStatus()
                    
                }
            }}>Update Status</Button>
            <Title level={2}>My Likes</Title>
            <Title level={4}>{likedBy}</Title>
            <Title level={2}>My Dislikes</Title>
            <Title level={4}>{dislikedBy}</Title>
            <Title level={2}>My Status</Title>
            <Title level={4}>{myStatus}</Title>
            <Title>Profiles</Title>

            

            {/* <pre>{JSON.stringify(profiles,undefined,2)}</pre>        */}
            {profiles.length>0 && profiles.map(profile => {
                return (
                    <div key={profile.id}>
                        {/* <Col span={8}> */}
                            <Profile profile={profile}/>
                        {/* </Col> */}
                    </div>
                )
            })}    
        </div>
    )
}

export default Dashboard