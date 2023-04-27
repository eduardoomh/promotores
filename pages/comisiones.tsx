import { Col, Row, Typography, message } from 'antd';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { FC, useContext, useEffect, useState } from 'react';
import CardContainer from '../components/containers/CardContainer';
import CommissionForm from '../components/pages/Commissions/CommissionForm';
import CustomTable from '../components/pages/Table';
import { CommissionDataI } from '../interfaces/commission.interfaces';
import { PromoterDataI } from '../interfaces/promoter.interfaces';
import { GenericContext } from '../context/GenericContext';
import ModalComission from '../components/pages/Commissions/ModalComission';
import { useDelete } from '../hooks/useDelete';
import { deleteCommission } from '../services/commission_s';

interface props {
  promoters: PromoterDataI[]
  comissions: CommissionDataI[]
}

const Comisiones: FC<props> = ({ promoters, comissions }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [commissionsArray, setCommissionsArray] = useState<CommissionDataI[] | unknown>(comissions)
  const [commission, setCommission] = useState<CommissionDataI | undefined>(undefined)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [loadingList, setloadingList] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('Crear Nueva Comisión')
  const { fetchDataDelete, isLoadingDelete } = useDelete(deleteCommission)
  const { currentComission, changeCurrentComission } = useContext(GenericContext)

  const showModal = (type?: 'CREATE' | 'MODIFY') => {
    switch (type) {
      case 'CREATE':
        setModalTitle('Nueva comisión')
        break
      case 'MODIFY':
        setModalTitle('Comisión Actualizada')
        break
      default:
        setModalTitle('Información de la comisión')
        break
    }
    setOpenModal(true)
  }

  const assignNewComission = (comission: CommissionDataI) => {
    changeCurrentComission(comission)
    showModal()
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  const changeLoadingList = (state: boolean) => {
    setloadingList(state)
  }

  const changeCommission = (commission: CommissionDataI) => {
    setCommission(commission)
  }

  const refreshComissions = (commission: CommissionDataI[] | unknown) => {
    setCommissionsArray(commission)
  }

  const changeEditMode = (state: boolean) => {
    setEditMode(state)

    if (state) {
      closeModal()
    }
  }

  const pushCommission = (commission: CommissionDataI) => {
    setCommissionsArray([
      {
        ...commission
      },
      ...commissionsArray as CommissionDataI[],
    ])
    changeCommission(commission)
  }

  const refetchingComissions = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/commissions`);
      refreshComissions(response.data)
      changeCommission(response.data[0])

    } catch (error) {
      console.log("error", error)
    }
  }

  const dropComission = async (id: string) => {
    try {
      await fetchDataDelete(id)
      refetchingComissions()
      closeModal()
      message.success('La comisión ha sido eliminada exitosamente.')

    } catch (error) {
      console.log(error)
      message.error('Ha habido un error, intente mas tarde.')
    }

  }

  useEffect(() =>{
    setCommission(currentComission)
  },[currentComission])


  return (
    <>
      <Row>
        <Col span={24}>
          <CardContainer cardStyle={{ marginLeft: '22px' }}>
            <Typography.Title level={2}>Comisiones</Typography.Title>
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
        <Col span={8}>
          <CommissionForm
            showModal={showModal}
            changeCommission={changeCommission}
            changeLoadingList={changeLoadingList}
            changeEditMode={changeEditMode}
            pushCommission={pushCommission}
            editMode={editMode}
            commission={commission}
            promoters={promoters}
          />
        </Col>
        <Col span={16}>
          <CustomTable
            type='COMMISSIONS'
            data={commissionsArray as any[]}
            loading={loadingList}
            assignNewPromoter={assignNewComission}
          />
        </Col>
      </Row >
      <ModalComission
        modalTitle={modalTitle}
        openModal={openModal}
        comission={commission}
        isLoadingDelete={isLoadingDelete}
        closeModal={closeModal}
        dropComission={dropComission}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const promoters = await axios.get('http://localhost:3000/api/promoters')
  const commissions = await axios.get('http://localhost:3000/api/commissions')
  console.log(commissions.data, "devuelv e esto")

  if (!promoters || !commissions) {
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
      comissions: commissions.data
    }
  }
}

export default Comisiones