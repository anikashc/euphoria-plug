import React, {useEffect,useState} from 'react'
import { Input, Button,Col,Row } from 'antd';
import { Typography } from 'antd';
import {db,auth} from '../firebase'
import { useNavigate } from 'react-router-dom';
import DashboardDataService from '../services/dashboard.services'
import UserDataServices from '../services/user.services'
import Profile from '../components/profile';
import Favourite from '../components/favourite'
import useStore from '../store';

const { Title } = Typography;
const { TextArea } = Input;

const Dashboard = () => {
    const setProfile = useStore((state) => state.setProfile)
    const setProfiles = useStore((state) => state.setProfiles)
    const setFavourites = useStore((state) => state.setFavourites)
    const logout = useStore((state) => state.logout)
    const token = useStore((state) => state.token) || localStorage.getItem('token')
    const profile = useStore((state) => state.profile)
    const profiles = useStore((state) => state.profiles)
    const favourites = useStore((state) => state.favourites)
    const userId = localStorage.getItem('userId')
    const [totalProfiles, setTotalProfiles] = useState(0)

    let navigate = useNavigate();
    const [status, setStatus] = useState('')

    const updateStatus = async () =>{
        const updatedUser = await DashboardDataService.updateStatus(userId,{
            status: status
        })
        setProfile(updatedUser.data())
        setStatus('')
    }

    const getProfiles = async() => {
        const data = await UserDataServices.getUsers(userId)
        setTotalProfiles(data.docs.length)
        const myProfile = data.docs.find(profile => profile.id === userId)
        const otherProfiles = data.docs.filter(doc => doc.id !== userId);    
        setProfiles(otherProfiles.map(doc => (  
            {...doc.data(), id: doc.id} 
        )))
        setProfile(myProfile.data())
        setFavourites(myProfile.data().favourites)
    }

    useEffect(() => {
        if(!token){
            navigate('/')
        }
        getProfiles()
    }, [token,setProfiles,navigate,setProfile,logout,setFavourites])
    if(totalProfiles === 0){
        return <div>Loading...</div>
    }
    else if(profile.status === ""){
        return (
            <div>
                <Title level={2}>Dashboard</Title>
                    <Title>Set your first status...</Title>
                    <TextArea rows={4} placeholder="Share your status..."
                        onChange = {(e) => {
                            setStatus(e.target.value)
                        }} 
                        value={status}
                    />
                    <Button type="primary" onClick={() => {
                        
                        if(status){
                            updateStatus()
                            
                        }
                }}>Update Status</Button>
            </div>
        )
    }
    return (
        <div>
            <Title level={2}>Dashboard</Title>
            <Title>What's your status?</Title>
            <TextArea rows={4} placeholder="Share your status..."
                onChange = {(e) => {
                    setStatus(e.target.value)
                }} 
                value={status}
            />
            <Button type="primary" onClick={() => {
                
                if(status){
                    updateStatus()
                    
                }
            }}>Update Status</Button>
            <Row>
                <Col md={8}>    
                    <Title level={2}>My Likes</Title>
                    <Title level={4}>{profile.likes}</Title>
                </Col>
                <Col md={8}>
                    <Title level={2}>My Dislikes</Title>
                    <Title level={4}>{profile.dislikes}</Title>
                </Col>
                <Col md={8}>
                    <Title level={2}>My Status</Title>
                    <Title level={4}>{profile.status}</Title>
                </Col>

            </Row>


            <Title>Favourites</Title>

            {/* <pre>{JSON.stringify(profiles,undefined,2)}</pre>        */}
            {favourites.length>0 && favourites.map(profile => {
                return (
                    <div key={profile.id}>
                        {/* <Col span={8}> */}
                            <Favourite profile={profile}/>
                        {/* </Col> */}
                    </div>
                )
            })}

            <Title>Other Profiles</Title>

            

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