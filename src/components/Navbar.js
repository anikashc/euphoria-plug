import { Header } from 'antd/lib/layout/layout'
import { Row, Col, Button, Typography,Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import useStore from '../store';
import React from 'react'

import '../App.css'
const { confirm } = Modal;
const { Text, Title, Link } = Typography;


const Navbar = () => {
  const token = useStore((state) => state.token) || localStorage.getItem('token')
  const setToken = useStore((state) => state.setToken)
  const setLogout = useStore((state) => state.setLogout);

  const signOutOfEuphoria = async() => {
    
    if(!localStorage.getItem('anon')){
        await signOut(auth)
        // setLogout(true)

        localStorage.removeItem('userId');
        localStorage.removeItem('anon');
        localStorage.removeItem('token');
    }
    else{
      confirm({
        title: 'Do you want to save the session?',
        icon: <ExclamationCircleOutlined />,
        async onOk(){
          await signOut(auth)
          // setLogout(true)
  
          if(!localStorage.getItem('anon')){
            localStorage.removeItem('userId');
          }
          localStorage.removeItem('anon');
          localStorage.removeItem('token');
        },
        async onCancel() {
          await signOut(auth)
          // setLogout(true)
  
          localStorage.removeItem('userId');
          localStorage.removeItem('anon');
          localStorage.removeItem('token');
        },
      });
    }
    setToken(null)
    setLogout(true)
  }

  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            

            <Row>
              <Link  href="/dashboard">
                <Title type="warning" style={{
                  marginTop: '10px'
                }}>
                  Euphoria
                </Title>
              </Link>
              {
                token?(<Col offset={16} >
                  <Button type="primary" onClick={signOutOfEuphoria}
                  style={{marginTop: '15px'}}>Sign Out</Button>
                </Col>):null
              }
              
            </Row>
            
    </Header>
  )
}

export default Navbar