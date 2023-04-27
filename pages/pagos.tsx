import { Col, Row, Typography, message } from 'antd';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { FC, useContext, useEffect, useState } from 'react';
import CardContainer from '../components/containers/CardContainer';
import MovementForm from '../components/pages/Movements/MovementForm';
import CustomTable from '../components/pages/Table';
import { MovementDataI } from '../interfaces/movement.interfaces';
import { PromoterDataI } from '../interfaces/promoter.interfaces';
import ModalMovement from '../components/pages/Movements/ModalMovement';
import { GenericContext } from '../context/GenericContext';
import { useDelete } from '../hooks/useDelete';
import { deleteMovement } from '../services/movement_s';

interface props {
  promoters: PromoterDataI[]
  movements: MovementDataI[]
}

const Pagos: FC<props> = ({ promoters, movements }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [movementsArray, setMovementsArray] = useState<MovementDataI[] | unknown>(movements)
  const [movement, setMovement] = useState<MovementDataI | undefined>(undefined)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [loadingList, setloadingList] = useState<boolean>(false)
  const { fetchDataDelete, isLoadingDelete } = useDelete(deleteMovement)
  const [modalTitle, setModalTitle] = useState<string>('Crear Nuevo Pago')
  const { currentMovement, changeCurrentMovement } = useContext(GenericContext)

  const showModal = (type?: 'CREATE' | 'MODIFY') => {
    switch (type) {
      case 'CREATE':
        setModalTitle('Nuevo pago')
        break
      case 'MODIFY':
        setModalTitle('Movimiento Actualizado')
        break
      default:
        setModalTitle('Información del Pago')
        break
    }
    setOpenModal(true)
  }

  const assignNewMovement = (movement: MovementDataI) => {
    changeCurrentMovement(movement)
    showModal()
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  const changeLoadingList = (state: boolean) => {
    setloadingList(state)
  }

  const changeMovement = (movement: MovementDataI) => {
    setMovement(movement)
  }
  const refreshMovements = (movements: MovementDataI[] | unknown) => {
    setMovementsArray(movements)
  }


  const changeEditMode = (state: boolean) => {
    setEditMode(state)

    if (state) {
      closeModal()
    }
  }

  const pushMovement = (movement: MovementDataI) => {
    setMovementsArray([
      {
        ...movement
      },
      ...movementsArray as MovementDataI[],
    ])
    changeMovement(movement)
  }

  const refetchingMovements = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/commissions`);
      refreshMovements(response.data)
      changeMovement(response.data[0])

    } catch (error) {
      console.log("error", error)
    }
  }

  const dropMovement = async (id: string) => {
    try {
      await fetchDataDelete(id)
      refetchingMovements()
      closeModal()
      message.success('La comisión ha sido eliminada exitosamente.')

    } catch (error) {
      console.log(error)
      message.error('Ha habido un error, intente mas tarde.')
    }

  }

  useEffect(() =>{
    setMovement(currentMovement)
  },[currentMovement])



  return (
    <>
      <Row>
        <Col span={24}>
          <CardContainer cardStyle={{ marginLeft: '22px' }}>
            <Typography.Title level={2}>Pagos</Typography.Title>
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
          <MovementForm
            showModal={showModal}
            changeMovement={changeMovement}
            changeLoadingList={changeLoadingList}
            changeEditMode={changeEditMode}
            pushMovement={pushMovement}
            editMode={editMode}
            movement={movement}
            promoters={promoters}
          />
        </Col>
        <Col span={16}>
          <CustomTable
            type='MOVEMENTS'
            data={movementsArray as any[]}
            loading={loadingList}
            assignNewPromoter={assignNewMovement}
          />
        </Col>
      </Row >
      <ModalMovement
        modalTitle={modalTitle}
        openModal={openModal}
        movement={movement}
        isLoadingDelete={isLoadingDelete}
        closeModal={closeModal}
        dropMovement={dropMovement}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const promoters = await axios.get('http://localhost:3000/api/promoters')
  const movements = await axios.get('http://localhost:3000/api/movements')

  if (!promoters || !movements) {
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
      movements: movements.data
    }
  }
}

export default Pagos