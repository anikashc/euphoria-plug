import React,{useEffect} from 'react'
import { Button, Col, Row } from 'antd';
import { useNavigate } from "react-router-dom";
import {auth} from '../firebase'
import {signInWithPopup, GoogleAuthProvider,signInAnonymously } from "firebase/auth";
import UserDataService from '../services/user.services';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import useStore from '../store';

const Login = (props) => {
    let navigate = useNavigate();

    const setToken = useStore((state) => state.setToken);
    const setUser = useStore((state) => state.setUser);



    useEffect(() => {
      if(localStorage.getItem('token')){
        navigate('/dashboard')
        }
    }, [])
    const signInAnon = () => {
        signInAnonymously(auth)
        .then(result => {

            setToken(result.user.accessToken)

            axios.get('https://randomuser.me/api/')
            .then(res => {
                const user = res.data.results[0]
                const { name, email, picture } = user
                const newUser = {
                    id: result.user.uid,
                    name : name.first + ' ' + name.last,
                    email,
                    photo: picture.large,
                    status: '',
                    likes: 0,
                    dislikes: 0,
                    createdAt: new Date().toISOString(),
                }
                UserDataService.addUser(newUser)
                .then(res => {
                    setUser(newUser)
                    console.log(res)
                    navigate('/dashboard')
                })
                .catch(err => {
                    setToken(null)
                    setUser({})
                    console.log(err)
                })
            })
        })  
        .catch(err => {
            setToken(null)
            setUser({})
            console.log(err)
        })       

    }
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        provider.setCustomParameters({
            'login_hint': 'akh.chakraborty11@gmail.com',
            'prompt': 'select_account'
          });
        signInWithPopup(auth, provider)
        .then(result => {

            setToken(result.user.accessToken)
            console.log(result.user)
            
            // check if the user exists in the database
            UserDataService.getUser(result.user.uid)
            .then(res => {
                if(res.exists()){
                    setUser(res.data())
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
                        createdAt: new Date().toISOString(),
                    }
                    UserDataService.addUser(newUser)
                    .then(res => {
                        setUser(newUser)
                        navigate('/dashboard')
                    })
                    .catch(err => {
                        setToken(null)
                        setUser({})
                        console.log(err)
                    })
                }
            }).catch(err => {
                setToken(null)
                setUser({})
                console.log(err)
            })

            
        })
        .catch(error => {
            setToken(null)
            setUser({})
            console.log(error)
        })   
    }
    const signOut = () => {
        
        signOut(auth)
        .then(() => {
            localStorage.removeItem('token');
            setToken(null)
            setUser({})
            navigate(`/`);
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
    <div>
        

        <Row type="flex" align="middle">
            <Col md={10}>
                {
                localStorage.getItem('token') 
                ? <Button type="primary" onClick={() => {signOut}}>Logout</Button> 
                : (
                    <Button type="primary" onClick={signInWithGoogle}>Sign in with Google</Button>
                )

            }
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col md={10}>
                {
                    localStorage.getItem('token') 
                    ? null 
                    : (
                        <Button type="primary" onClick={signInAnon}>Sign in Anonymously</Button>
                    )

                }
            </Col>
        </Row>

       

        
       
    </div>
  )
}

export default Login