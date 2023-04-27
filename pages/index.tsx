import { Row, Tag, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import AdminDashboard from '../components/pages/Dashboard/AdminDashboard';
import { UserDataI } from '../interfaces/user.interfaces';
import CardContainer from '../components/containers/CardContainer';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { StatsI } from '../interfaces/app.interfaces';
import PromoterDashboard from '../components/pages/Dashboard/PromoterDashboard';
interface props {
  stats: StatsI;
}


const Home: FC<props> = ({ stats }) => {
  const [user, setUser] = useState<UserDataI | null>(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as string)
    setUser(user)
  }, [])

  return (
    <>
      <CardContainer>
        <Typography.Title style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center"
        }}
          level={2}>
          Bienvenido {user?.name}
          <Tag
            color='volcano'
            style={{
              fontSize: "0.8rem",
              marginTop: "0.2rem",
              marginLeft: "0.5rem"
            }}
          >
            {user?.email}
          </Tag>
        </Typography.Title>
      </CardContainer>
      <Row>

      </Row>
      {
        user?.role && user?.role === 'admin' 
          ? <AdminDashboard stats={stats} /> 
          : <PromoterDashboard />
      }

    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const stadistics = await axios.get(process.env.FRONT_URL+'/api/stadistics')

  if (!stadistics) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      stats: stadistics.data,
    }
  }
}

export default Home
