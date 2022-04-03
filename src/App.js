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
const { Header, Footer, Content } = Layout;
const AppRoutes = () => {
    let routes = useRoutes([
        { path: "/", element: <Login /> },
        { path: '/dashboard', element: <Dashboard /> },
    ]);
    return routes;
};
const App = () => ( 
    <Layout>
        <Navbar />
        <Content style={{ height: '100%' }}>
        <div className="site-layout-content">
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

