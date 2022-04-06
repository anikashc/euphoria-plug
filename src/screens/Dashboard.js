import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button,Col,Row,Layout,Pagination, Space,Spin, Grid, Skeleton, Avatar } from 'antd';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import DashboardDataService from '../services/dashboard.services'
import UserDataServices from '../services/user.services'
import Profile from '../components/profile';
import Favourite from '../components/favourite'
import Info from '../components/Info';
import { setProfile, setProfiles, setFavourites, setToken } from '../actions/dashboardActions';

const { Title } = Typography;
const { TextArea } = Input;
const pageSizeFav = 3;
const pageSizePro = 6;
const Dashboard = () => {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token) || localStorage.getItem('token')
    const profile = useSelector((state) => state.profile)
    console.log(profile)
    const profiles = useSelector((state) => state.profiles)
    const favourites = useSelector((state) => state.favourites)

    const [isLoading, setIsLoading] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const userId = localStorage.getItem('userId')
    const [currentFav, setCurrentFav] = useState(1)
    const [minIndexFav, setMinIndexFav] = useState(0)
    const [maxIndexFav, setMaxIndexFav] = useState(0)
    const [totalPageFav, setTotalPageFav] = useState(0)

    const [currentPro, setCurrentPro] = useState(1)
    const [minIndexPro, setMinIndexPro] = useState(0)
    const [maxIndexPro, setMaxIndexPro] = useState(0)
    const [totalPagePro, setTotalPagePro] = useState(0)

    const [totalFavourites, setTotalFavourites] = useState(0)
    const [totalProfiles, setTotalProfiles] = useState(0)

    let navigate = useNavigate();
    const [status, setStatus] = useState('')

    const updateStatus = async () =>{
        setIsUpdating(true)
        const updatedUser = await DashboardDataService.updateStatus(userId,{
            status: status
        })
        dispatch (setProfile(updatedUser.data()))
        setStatus('')
        setIsUpdating(false)
    }
    const handleChangeFav =(page) =>{
        setCurrentFav(page)
        setMinIndexFav((page-1)*pageSizeFav)
        setMaxIndexFav(page*pageSizeFav)
    }

    const handleChangePro =(page) =>{
        setCurrentPro(page)
        setMinIndexPro((page-1)*pageSizePro)
        setMaxIndexPro(page*pageSizePro)
    }

    useEffect(() => {
        if(!token){
            navigate('/')
        }
        setIsLoading(true)

        
        const getProfiles = async() => {
            const data = await UserDataServices.getUsers(userId)
            setTotalProfiles(data.docs.length)
            const myProfile = data.docs.find(profile => profile.id === userId)
            const otherProfiles = data.docs.filter(doc => doc.id !== userId);    
            dispatch(setProfiles(otherProfiles.map(doc => (  
                {...doc.data(), id: doc.id} 
            ))))
            dispatch(setProfile(myProfile.data()))
            console.log('profile',profile)
            dispatch(setFavourites(myProfile.data().favourites))


            // for pagination
            setTotalFavourites(myProfile.data().favourites.length)
            setTotalPageFav(myProfile.data().favourites.length/pageSizeFav)
            setTotalPagePro(data.docs.length/pageSizePro)
            setMinIndexFav(0);
            setMaxIndexFav(pageSizeFav);
            setMinIndexPro(0);
            setMaxIndexPro(pageSizePro);
        }

        getProfiles().then(() => {
            setIsLoading(false)
            console.log('profiles',profiles)
        })

        .catch(console.error);
    }, [navigate, setProfile, setProfiles, setFavourites])

    useEffect(() => {
        if(!token){
            navigate('/')
        }
    }, [token, setToken])

    if(isLoading){
        return <div><Skeleton active /></div>
    }
    else if(profile.status === ""){
        return (
            <Space>
                <Layout>
                    <Row>
                        <Col span={24}>
                            <Title level={2}>
                                <span>Hi {profile.name}</span>
                            </Title>
                        </Col>
                    </Row>

                  
                        <Title>Set your first status...</Title>
                        <TextArea rows={4} placeholder="Share your status..."
                            onChange = {(e) => {
                                setStatus(e.target.value)
                            }} 
                            value={status}
                        />
                        <Button type="primary" 
                        loading={isUpdating}
                        onClick={() => {
                            
                            if(status){
                                updateStatus()   
                            }                         
                        }}
                            style={{
                                marginTop: '10px'
                            }}
                        >Update Status</Button>
                </Layout>
            </Space>
        )
    }
    return (
        <Space>

            <Layout>
                <Row justify='center' gutter={8}>
                    <Col span={24}>
                        <Title level={2}>
                            <span>Hi {profile.name}</span>
                        </Title>
                    </Col>
                </Row>

                <Row justify='center' gutter={99}>
                    <Col span={3}>
                        <Avatar shape="square" size={80} src={profile.photo} alt={profile.name} />
                    </Col>
                    <Col span={10} 
                    >
                        <Title level={3}>What's your status?</Title>
                        <TextArea autoSize={true} placeholder="Share your status in 100 characters..."
                            onChange = {(e) => {
                                setStatus(e.target.value)
                            }} 
                            value={status}
                            showCount={true}
                            maxLength={100}
                        />
                        <Button type="primary" 
                        loading={isUpdating}
                        onClick={() => {
                            
                            if(status){
                                updateStatus()
                            }
                        }}
                        style={{
                            marginTop: '10px'
                        }}
                        >Update Status</Button>
                    </Col>
                    <Col span={11}
                    >
                        <Info profile={profile} />
                    </Col>
                </Row>
                <Row>
                    {favourites.length>0 ? (
                        <Space>
                            <Title level={2}>Favourites</Title>
                            <Pagination
                                pageSize={pageSizeFav}
                                current={currentFav}
                                total={totalFavourites}
                                onChange={handleChangeFav}
                            />
                        </Space>
                    ):null}

                </Row>

                <Row>

                    {favourites.length>0 && favourites.map((profile,index) => {
                        return (index >= minIndexFav &&
                        index < maxIndexFav &&(
                        
                            <div key={profile.id}>
                                <Col span={24}>
                                    <Favourite profile={profile}/>
                                </Col>
                            </div>))
                        
                    })}
                </Row>
                
                <Space>
                    <Title level={2}>All Profiles</Title>
                    <Pagination
                        pageSize={pageSizePro}
                        current={currentPro}
                        total={totalProfiles}
                        onChange={handleChangePro}
                    />
                </Space>

                <Row>
                    {profiles.length>0 && profiles.map((profile,index) => {
                        
                        return ( index >= minIndexPro &&
                            index < maxIndexPro &&

                            <div key={profile.id}>
                                <Col span={24}>

                                    <Profile profile={profile} />
                                </Col>
                            </div>
                        )
                    })}    

                </Row>
            </Layout>
        </Space>
    )
}

export default Dashboard