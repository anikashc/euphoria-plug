import { Header } from 'antd/lib/layout/layout'
import { Row, Col, Button, Typography,Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import React from 'react'
import { setLogout, setToken} from '../actions/dashboardActions';
import '../App.css'
import { useSelector,useDispatch } from 'react-redux';
const { confirm } = Modal;
const { Text, Title, Link } = Typography;


const Navbar = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const signOutOfEuphoria = async() => {
    
    if(!localStorage.getItem('anon')){
        await signOut(auth)
        localStorage.removeItem('userId');
        localStorage.removeItem('anon');
        dispatch(setToken(null))
        dispatch(setLogout(true))
    }
    else{
      confirm({
        title: 'Do you want to save the session?',
        icon: <ExclamationCircleOutlined />,
        async onOk(){
          await signOut(auth)
          if(!localStorage.getItem('anon')){
            localStorage.removeItem('userId');
          }
          localStorage.removeItem('anon');
          dispatch(setToken(null))
          dispatch(setLogout(true))
        },
        async onCancel() {
          await signOut(auth)
          // setLogout(true)
  
          localStorage.removeItem('userId');
          localStorage.removeItem('anon');
          dispatch(setToken(null))
          dispatch(setLogout(true))
        },
      });
      
    }
    
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