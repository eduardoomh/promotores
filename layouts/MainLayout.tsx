//.jsx
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Col, Layout, Menu, Row } from 'antd';
import Image from 'next/image';
import React, { FC, PropsWithChildren, ReactElement, useState } from 'react';
const { Header, Sider, Content } = Layout;

interface props {
    children: ReactElement
}
const MainLayout: FC<PropsWithChildren<props>> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);


    return (
        
        <Row style={{height: '100vh'}}>
            <Col span={2} style={{backgroundColor: '#031529'}}>
                <div>hola</div>
            </Col>
            <Col span={22} style={{backgroundColor: '#f0f2f5'}}>
                <div>mundo</div>
            </Col>
           
        </Row>
    )
}

export default MainLayout