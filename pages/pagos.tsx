import { Col, Row, Typography } from 'antd';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { FC, useState } from 'react';
import CardContainer from '../components/containers/CardContainer';
import CommissionForm from '../components/pages/Commissions/CommissionForm';
import MovementForm from '../components/pages/Movements/MovementForm';
import CustomTable from '../components/pages/Table';
import { CommissionDataI } from '../interfaces/commission.interfaces';
import { MovementDataI } from '../interfaces/movement.interfaces';
import { PromoterDataI } from '../interfaces/promoter.interfaces';

interface props {
    promoters: PromoterDataI[]
    movements: MovementDataI[]
  }
  
const Pagos: FC<props> = ({promoters, movements }) => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [movementsArray, setMovementsArray] = useState<MovementDataI[] | unknown>(movements)
    const [movement, setMovement] = useState<MovementDataI | undefined>(undefined)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [loadingList, setloadingList] = useState<boolean>(false)
    const [modalTitle, setModalTitle] = useState<string>('Crear Nuevo Promotor')

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

      const closeModal = () => {
        setOpenModal(false)
      }

      const changeLoadingList = (state: boolean) => {
        setloadingList(state)
      }
    
      const changeMovement = (movement: MovementDataI) => {
        setMovement(movement)
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
                    />
                </Col>
            </Row >
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const promoters = await axios.get('http://localhost:3000/api/promoters')
    const movements = await axios.get('http://localhost:3000/api/movements')
    console.log(movements.data)

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