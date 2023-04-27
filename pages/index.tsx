import { Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import AdminDashboard from '../components/pages/Dashboard/AdminDashboard';
import { UserDataI } from '../interfaces/user.interfaces';
import CardContainer from '../components/containers/CardContainer';

export default function Home() {
  const [user, setUser] = useState<UserDataI | null>(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as string)
    setUser(user)
  }, [])

  return (
    <>
      <CardContainer>
        <Typography.Title level={2}>Bienvenido {user?.name}</Typography.Title>
      </CardContainer>
      <Row>
        
      </Row>
      {
        user?.role && user?.role === 'admin' ? <AdminDashboard /> : <p>Cliente normal</p>
      }

    </>
  )
}