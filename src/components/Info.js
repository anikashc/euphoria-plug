import React from 'react'
import { Card ,Avatar, Row, Col,Typography } from 'antd';
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
                title={profile.status}
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