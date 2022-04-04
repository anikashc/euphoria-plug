import { Header } from 'antd/lib/layout/layout'
import { Row, Col, Button } from 'antd';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import useStore from '../store';
import React from 'react'
import '../App.css'
const Navbar = () => {
  const token = useStore((state) => state.token) || localStorage.getItem('token')
  const setToken = useStore((state) => state.setToken);
  const setLogout = useStore((state) => state.setLogout);

  const signOutOfEuphoria = async() => {
      await signOut(auth)
      setLogout(true)
      setToken(null)
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
  }
  return (
    <Header style={{ position: 'fixed', zIndex: 0, width: '100%' }}>
            <div className="logo" />

            <Row>
            
              {
                token?(<Col offset={20} >
                  <Button type="primary" onClick={signOutOfEuphoria}
                  style={{marginTop: '15px'}}>Sign Out</Button>
                </Col>):null
              }
              
            </Row>
            
    </Header>
  )
}

export default Navbar