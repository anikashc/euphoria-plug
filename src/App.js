import React from "react";
import 'App.css';
import {
    BrowserRouter as Router,
    useRoutes,
  } from "react-router-dom";
import Login from "./screens/Login";
import { Layout,Menu } from 'antd';
import Dashboard from "./screens/Dashboard";
import Navbar from "./components/Navbar";
const { Footer, Content } = Layout;
const AppRoutes = () => {
    let routes = useRoutes([
        { path: "/", element: <Login /> },
        { path: '/dashboard', element: <Dashboard /> },
    ]);
    return routes;
};
const App = () => ( 
    <Layout className="site-layout-content">
        <Navbar />
        <Content style={{ 
            minHeight: '80vh',
            margin: '24px 16px',
            padding: 24,
            marginTop: 64,
            

        }}>
        <div >
            <Router>
                <AppRoutes />
            </Router>
        </div>
        </Content>
      <Footer>
          <div style={{ textAlign: 'center' }} >
            Euphoria @2022
          </div>
      </Footer>
    </Layout>
);

export default App;

