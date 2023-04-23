import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import { Col, Row, Typography, message, Form } from 'antd';
import InputContainer from "../components/containers/InputContainer";
import CardContainer from "../components/containers/CardContainer";

function Home() {
  const [form] = Form.useForm()
  const router = useRouter();
  console.log(router.pathname)

  const handleSubmit = async (data: any) => {
    console.log(data)
    //const res = await axios.post("/api/auth/login", credentials);
    //console.log(res);

    // if (res.status === 200) {
    // router.push("/comisiones");
    //}
  };

  return (
    <Row style={{
      maxWidth: "100vw",
      minHeight: "100vh",
      maxHeight: "100vh",
      display: "grid",
      placeItems: "center",
      backgroundColor: "#f0f2f5"
    }}>
      <Form
        form={form}
        onFinish={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: "1rem",
          width: "33vw"
        }}>

        <CardContainer>
          <Col span={24} style={{ display: "grid", placeItems: "center"}}>
            <Image
              src={'/logo-Chamosa.png'}
              alt='Chamosa Logo'
              width={110}
              height={70}
            />
            <div style={{marginTop: "0.5rem"}}>
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
    </Row>
  );
}

export default Home;