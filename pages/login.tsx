import axios from "axios";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import { Col, Row, Typography, message, Form, Spin } from 'antd';
import InputContainer from "../components/containers/InputContainer";
import CardContainer from "../components/containers/CardContainer";
import { usePost } from "../hooks/usePost";
import { loginUser } from "../services/user_s";
import { LoginUserI, UserDataI } from "../interfaces/user.interfaces";
import { GenericContext } from "../context/GenericContext";

function Home() {
  const { fetchData, isLoading: isLoadingCreate } = usePost(loginUser)
  const { saveLoggedUser } = useContext(GenericContext)
  const [form] = Form.useForm()
  const router = useRouter();

  const onFinish = async (data: LoginUserI) => {
    try {
      const response = await fetchData({
        email: data.email,
        password: data.password
      })
      if (!response.error) {
        saveLoggedUser(response.data as UserDataI)
        localStorage.setItem('user', JSON.stringify(response.data));
        form.resetFields()
        router.push('/')
      } else {
        //@ts-ignore
        message.error(response.error.message)
      }

    } catch (error) {
      console.log(error)
       //@ts-ignore
       message.error(response.error.message)
    }
  }


  return (
    <Row style={{
      maxWidth: "100vw",
      minHeight: "100vh",
      maxHeight: "100vh",
      display: "grid",
      placeItems: "center",
      backgroundColor: "#f0f2f5"
    }}>
      <Spin spinning={isLoadingCreate}>
        <Form
          form={form}
          onFinish={onFinish}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "1rem",
            width: "33vw"
          }}>

          <CardContainer>
            <Col span={24} style={{ display: "grid", placeItems: "center" }}>
              <Image
                src={'/logo-Chamosa.png'}
                alt='Chamosa Logo'
                width={110}
                height={70}
              />
              <div style={{ marginTop: "0.5rem" }}>
                <Typography.Title level={4}>Iniciar Sesión</Typography.Title>
              </div>

            </Col>


            <br />
            <Col span={24}>
              <Typography>Correo</Typography>
              <InputContainer
                type="email"
                required
                placeholder='Correo'
                valueContainerName="email"
              />
            </Col>
            <Col span={24}>
              <Typography>Contraseña</Typography>
              <InputContainer
                type="password"
                required
                placeholder='Contraseña'
                valueContainerName="password"
              />
            </Col>
            <Col span={24}>
              <InputContainer
                title={'Iniciar Sesión'}
                type="submitButton"
              />
            </Col>
          </CardContainer>
        </Form>
      </Spin>
    </Row>
  );
}

export default Home;