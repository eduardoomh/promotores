import { Col, Row, Typography } from 'antd';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useDelete } from '../hooks/useDelete';
import CardContainer from '../components/containers/CardContainer';
import PromotoresForm from '../components/pages/Promotores/PromotoresForm';
import { PromoterDataI } from '../interfaces/promoter.interfaces';
import PromoterEditMode from '../components/pages/Promotores/PromoterEditMode';
import { deletePromoter } from '../services/promoter_s';
import ModalPromoter from '../components/pages/Promotores/ModalPromoter';
import CustomTable from '../components/pages/Table';
import { GenericContext } from '../context/GenericContext';
import { UserDataI } from '../interfaces/user.interfaces';
import { deleteFromDB } from '../utils/crudActions.ts/deleteFromDB';
import { refetchingData } from '../utils/crudActions.ts/refetching';

interface props {
  promoters: PromoterDataI[];
  users: UserDataI[];
}

const Promotores: FC<props> = ({ promoters, users }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [promotersArray, setPromoterArray] = useState<PromoterDataI[] | unknown>(promoters)
  const [promoter, setPromoter] = useState<PromoterDataI | undefined>(undefined)
  const [editMode, setEditMode] = useState<boolean>(false)
  const { fetchDataDelete, isLoadingDelete } = useDelete(deletePromoter)
  const [loadingList, setloadingList] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('Crear Nuevo Promotor')
  const { currentPromoter, changeCurrentPromoter } = useContext(GenericContext)


  const closeModal = () => {
    setOpenModal(false)
  }

  const showModal = (type?: 'CREATE' | 'MODIFY') => {
    switch (type) {
      case 'CREATE':
        setModalTitle('Nuevo promotor')
        break
      case 'MODIFY':
        setModalTitle('Promotor Actualizado')
        break
      default:
        setModalTitle('Información del Promotor')
        break
    }
    setOpenModal(true)
  }

  const assignNewPromoter = (promoter: PromoterDataI) =>{
    changeCurrentPromoter(promoter)
    showModal()
  }

  const changeLoadingList = (state: boolean) => {
    setloadingList(state)
  }

  const changePromoter = (promoter: PromoterDataI) => {
    setPromoter(promoter)
  }

  const refreshPromoters = (promoters: PromoterDataI[] | unknown) => {
    setPromoterArray(promoters)
  }

  const changeEditMode = (state: boolean) => {
    setEditMode(state)

    if (state) {
      closeModal()
    }
  }

  const pushPromoters = (promoter: PromoterDataI) => {
    setPromoterArray([
      {
        ...promoter
      },
      ...promotersArray as PromoterDataI[],
    ])
    changePromoter(promoter)
  }

  const refetchingPromotors = async () => {
    await refetchingData(
      '/api/promoters',
      refreshPromoters,
      changePromoter
    )
  }

  const dropPromoter = async (id: string) => {
    await deleteFromDB(
      id,
      'El promotor ha sido eliminado exitosamente.',
      fetchDataDelete,
      refetchingPromotors,
      closeModal
    )
  }

  useEffect(() =>{
    setPromoter(currentPromoter)
  },[currentPromoter])


  return (
    <>
      <Row>
        <Col span={24}>
          <CardContainer cardStyle={{ marginLeft: '22px' }}>
            <Typography.Title level={2}>Promotores</Typography.Title>
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
          <PromotoresForm
            showModal={showModal}
            changePromoter={changePromoter}
            refetchingPromotors={refetchingPromotors}
            editMode={editMode}
            promoter={promoter}
            changeLoadingList={changeLoadingList}
            changeEditMode={changeEditMode}
            pushPromoters={pushPromoters}
            users={users}

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
                  <Typography.Title level={4} >Promotores Registrados</Typography.Title>
                </CardContainer>
                <CustomTable
                  type='PROMOTERS'
                  data={promotersArray as any[]}
                  loading={loadingList}
                  size={10}
                  assignNewPromoter={assignNewPromoter}
                />
              </>
            )
          }

        </Col>
      </Row >
      <ModalPromoter
        modalTitle={modalTitle}
        openModal={openModal}
        promoter={promoter}
        isLoadingDelete={isLoadingDelete}
        closeModal={closeModal}
        changeEditMode={changeEditMode}
        dropPromoter={dropPromoter}
      />
    </>)
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const promoters = await axios.get(process.env.FRONT_URL+'/api/promoters')
  const users = await axios.get(process.env.FRONT_URL+'/api/users/role/promoter')

  if (!promoters) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      promoters: promoters.data,
      users: users.data
    }
  }
}

export default Promotores