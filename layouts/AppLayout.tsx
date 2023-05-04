//.jsx
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, PropsWithChildren, ReactElement, useState } from 'react';
const { Header, Sider, Content } = Layout;
import { useRouter } from "next/router";
import axios from 'axios';

interface props {
    children: ReactElement
}
const FRONT_URL = "https://promotores.vercel.app"
//const FRONT_URL = "http://localhost:3000"
const AppLayout: FC<PropsWithChildren<props>> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter()

    if (router.pathname === '/login') return (
        <>
            {children}
        </>
    )

    const logout = async () => {
        console.log(`${process.env.FRONT_URL}/api/auth/logout`)
        const logout = await axios.get(`${FRONT_URL}/api/auth/logout`)
        router.push("/login")
        console.log(logout)
    }

    return (
        <Layout className="layout">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '12px'
                }}>
                    <Image
                        src={collapsed ? '/logoWithoutLetters.png' : '/logo-Chamosa.png'}
                        alt='Chamosa Logo'
                        width={collapsed ? 40 : 80}
                        height={collapsed ? 40 : 50}
                    />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: <Link href="/" passHref>
                                Inicio
                            </Link>
                        },
                        {
                            key: '2',
                            icon: <UploadOutlined />,
                            label: <Link href="/usuarios" passHref>
                                Usuarios
                            </Link>
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: <Link href="/promotores" passHref>
                                Promotores
                            </Link>
                        },
                        {
                            key: '4',
                            icon: <VideoCameraOutlined />,
                            label: <Link href="/comisiones" passHref>
                                Comisiones
                            </Link>
                        },
                        {
                            key: '5',
                            icon: <UploadOutlined />,
                            label: <Link href="/pagos" passHref>
                                Pagos
                            </Link>
                        },
                        {
                            key: '6',
                            icon: <UploadOutlined />,
                            label: <Link href="/configuracion" passHref>
                                Configuración
                            </Link>
                        },
                        {
                            key: '7',
                            icon: <UploadOutlined />,
                            label: <a onClick={logout}> Cerrar Sesión</a>
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}

                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '0',
                        padding: 24,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default AppLayout