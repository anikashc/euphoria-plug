import React from 'react'
import { Button, Card ,Avatar, Row, Col,Typography } from 'antd';
import useStore from '../store';
const { Meta } = Card;
const {Title} = Typography;

const Info = ({profile}) => {
    return (

        <div>
            <Card
                
                style={{ width: 300, margin: '15',whiteSpace: 'normal', height: 'auto',
                overflow: 'hidden'}}
               
            >
                <Meta
                avatar={<Avatar shape="square" src={profile.photo} alt={profile.name} />}
                title={profile.name}
                description={profile.status}
                style={{
                    whiteSpace: 'normal', height: 'auto',
                    overflow: 'hidden'
                }}
                />
                <Row>
                    <Col span={12}>
                        <Title level={5}>Likes : {profile.likes}</Title>
                    </Col>
                    <Col span={12}>
                        <Title level={5}>Dislikes : {profile.dislikes}</Title>
                    </Col>
                </Row>
            </Card>
        
        </div>
    )
}

export default Info