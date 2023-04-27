import { Col, Row, Typography, message } from 'antd';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useDelete } from '../hooks/useDelete';
import CardContainer from '../components/containers/CardContainer';
import { PromoterDataI } from '../interfaces/promoter.interfaces';
import PromoterEditMode from '../components/pages/Promotores/PromoterEditMode';
import { deletePromoter } from '../services/promoter_s';
import ModalPromoter from '../components/pages/Promotores/ModalPromoter';
import CustomTable from '../components/pages/Table';
import { GenericContext } from '../context/GenericContext';
import UsuariosForm from '../components/pages/Usuarios/UsuariosForm';
import { UserDataI } from '../interfaces/user.interfaces';
import ModalUser from '../components/pages/Usuarios/ModalUser';

interface props {
  promoters: PromoterDataI[]
}

const Usuarios: FC<props> = ({ promoters }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [usersArray, setUserArray] = useState<UserDataI[] | unknown>(promoters)
  const [user, setUser] = useState<UserDataI | undefined>(undefined)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [editPassword, setEditPassword] = useState<boolean>(false)
  const { fetchDataDelete, isLoadingDelete } = useDelete(deletePromoter)
  const [loadingList, setloadingList] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('Crear Nuevo Usuario')
  const { currentUser, changeCurrentUser } = useContext(GenericContext)


  const closeModal = () => {
    setOpenModal(false)
  }

  const showModal = (type?: 'CREATE' | 'MODIFY') => {
    switch (type) {
      case 'CREATE':
        setModalTitle('Nuevo usuario')
        break
      case 'MODIFY':
        setModalTitle('Usuario Actualizado')
        break
      default:
        setModalTitle('Información del Usuario')
        break
    }
    setOpenModal(true)
  }

  const assignNewUser = (user: UserDataI) =>{
    console.log(user)
    changeCurrentUser(user)
    showModal()
  }

  const changeLoadingList = (state: boolean) => {
    setloadingList(state)
  }

  const changeUser = (user: UserDataI) => {
    setUser(user)
  }

  const refreshPromoters = (promoters: PromoterDataI[] | unknown) => {
    setUserArray(promoters)
  }

  const changeEditMode = (state: boolean) => {
    setEditMode(state)
    setEditPassword(false)

    if (state) {
      closeModal()
    }
  }

  const changeEditPassword = (state: boolean) => {
    setEditPassword(state)
  }

  const refetchingUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users`);
      refreshPromoters(response.data)
      changeUser(response.data[0])

    } catch (error) {
      console.log("error", error)
    }
  }


  const pushUser = (user: UserDataI) => {
    setUserArray([
      {
        ...user
      },
      ...usersArray as PromoterDataI[],
    ])
    changeUser(user)
  }

  const dropUser = async (id: string) => {
    try {
      await fetchDataDelete(id)
      refetchingUsers()
      closeModal()
      message.success('El promotor ha sido eliminado exitosamente.')

    } catch (error) {
      console.log(error)
      message.error('Ha habido un error, intente mas tarde.')
    }

  }

  useEffect(() =>{
    setUser(currentUser)
  },[currentUser])


  return (
    <>
      <Row>
        <Col span={24}>
          <CardContainer cardStyle={{ marginLeft: '22px' }}>
            <Typography.Title level={2}>Usuarios</Typography.Title>
          </CardContainer>
        </Col>
      </Row>
      <Row
        gutter={[25, 5]}
        style={{
          marginTop: '1rem',
          padding: '2rem',
          borderRadius: '12px',
        }}>
        <Col span={10}>
          <UsuariosForm
            showModal={showModal}
            changeUser={changeUser}
            refetchingPromotors={refetchingUsers}
            editMode={editMode}
            user={user}
            changeLoadingList={changeLoadingList}
            changeEditMode={changeEditMode}
            pushUser={pushUser}
            editPassword={editPassword}
            changeEditPassword={changeEditPassword}

          />
        </Col>
        <Col span={14}>
          {
            editMode ? (
              <>
                <CardContainer cardStyle={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                  <Typography.Title level={4} >Modo de edición</Typography.Title>
                </CardContainer>
                <PromoterEditMode
                  changeEditMode={changeEditMode}
                />
              </>
            ) : (
              <>
                <CardContainer cardStyle={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                  <Typography.Title level={4} >Usuarios Registrados</Typography.Title>
                </CardContainer>
                <CustomTable
                  type='USERS'
                  data={usersArray as any[]}
                  loading={loadingList}
                  size={10}
                  assignNewPromoter={assignNewUser}
                />
              </>
            )
          }

        </Col>
      </Row >
      <ModalUser
        modalTitle={modalTitle}
        openModal={openModal}
        user={user}
        isLoadingDelete={isLoadingDelete}
        closeModal={closeModal}
        changeEditMode={changeEditMode}
        dropUser={dropUser}
      />
    </>)
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const users = await axios.get('http://localhost:3000/api/users')
  console.log(users.data)
  if (!users) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      promoters: users.data
    }
  }
}

export default Usuarios