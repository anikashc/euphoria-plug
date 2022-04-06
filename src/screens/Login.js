import React,{useEffect} from 'react'
import { Button, Col, Layout, Row, Space, Typography } from 'antd';
import { useNavigate } from "react-router-dom";
import {auth} from '../firebase'
import {signInWithPopup, GoogleAuthProvider,signInAnonymously } from "firebase/auth";
import UserDataService from '../services/user.services';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import useStore from '../store';
import { LoadingOutlined } from '@ant-design/icons';

const Login = (props) => {
    let navigate = useNavigate();

    const setToken = useStore((state) => state.setToken);
    const token = useStore((state) => state.token) || localStorage.getItem('token');
    // const setProfile = useStore((state) => state.setProfile);

    useEffect(() => {
        if(token){
            navigate('/dashboard')
        }
    }, [])

    // anonymous login
    const signInAnon = async () => {
        const result = await signInAnonymously(auth)
        if(result){
            setToken(result.user.accessToken)
            if(!localStorage.getItem('userId')){
                const getRandomUser = await axios.get('https://randomuser.me/api/')
                const user = getRandomUser.data.results[0]
                const { name, email, picture } = user
                const newUser = {
                    id: result.user.uid,
                    name : name.first + ' ' + name.last,
                    email,
                    photo: picture.large,
                    status: '',
                    likes: 0,
                    dislikes: 0,
                    liked : [],
                    anonymous: true,
                    disliked : [],
                    favourites: [],
                    createdAt: new Date().toISOString(),
                }
    
                await UserDataService.addUser(newUser)
                localStorage.setItem('userId', result.user.uid)
            }
            localStorage.setItem('anon', true)
            navigate('/dashboard')
        }    
    }
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        provider.setCustomParameters({
            'prompt': 'select_account'
          });
        const result = await signInWithPopup(auth, provider)
        if(result){
            setToken(result.user.accessToken)
            localStorage.setItem('userId', result.user.uid)
            const getUser = await UserDataService.getUser(result.user.uid)
            if(getUser.exists()){
                navigate('/dashboard')
            }else{
                const newUser = {
                    id: result.user.uid,
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                    status: '',
                    likes: 0,
                    dislikes: 0,
                    liked : [],
                    anonymous: false,
                    disliked : [],
                    favourites: [],
                    createdAt: new Date().toISOString(),
                }
                await UserDataService.addUser(newUser)
                localStorage.setItem('userId', result.user.uid)
                navigate('/dashboard')
            }
        }   
    }
    const signOut = () => {
        
        signOut(auth)
        .then(() => {
            localStorage.removeItem('token');
            setToken(null)
            setProfile({})
            navigate(`/`);
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
    <Layout>
        

        <Row type="flex" align="middle">
            <Col md={10}>
                {
                token 
                ? <LoadingOutlined />
                : (
                    <Space>
                        <Row>
                            <Button type="primary" onClick={signInWithGoogle}>Sign in with Google</Button>
                        </Row>
                        <Row>
                            <Button type="primary" onClick={signInAnon}>Sign in anonymously</Button>
                        </Row>
                    </Space>
                )

            }
            </Col>
        </Row>
        

       

        
       
    </Layout>
  )
}

export default Login