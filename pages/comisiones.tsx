import { Col, Row, Typography } from 'antd';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { FC, useState } from 'react';
import CardContainer from '../components/containers/CardContainer';
import CommissionForm from '../components/pages/Commissions/CommissionForm';
import CustomTable from '../components/pages/Table';
import { CommissionDataI } from '../interfaces/commission.interfaces';
import { PromoterDataI } from '../interfaces/promoter.interfaces';

interface props {
    promoters: PromoterDataI[]
    commissions: CommissionDataI[]
  }
  
const Comisiones: FC<props> = ({promoters, commissions }) => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [commissionsArray, setCommissionsArray] = useState<CommissionDataI[] | unknown>(commissions)
    const [commission, setCommission] = useState<CommissionDataI | undefined>(undefined)
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
    
      const changeCommission = (commission: CommissionDataI) => {
        setCommission(commission)
      }
    
      const refreshPromoters = (commission: CommissionDataI[] | unknown) => {
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
                    />
                </Col>
            </Row >
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const promoters = await axios.get('http://localhost:3000/api/promoters')
    const commissions = await axios.get('http://localhost:3000/api/commissions')
    console.log(commissions.data)

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
        commissions: commissions.data
      }
    }
  }
  
  export default Comisiones