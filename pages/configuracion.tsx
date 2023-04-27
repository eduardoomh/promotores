import { Col, Row, Typography } from 'antd';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { FC, useState } from 'react';
import CardContainer from '../components/containers/CardContainer';
import KeysForm from '../components/pages/Metadata/KeysForm';
import ModalMetadata from '../components/pages/Metadata/ModalMetadata';
import { MetadataDataI } from '../interfaces/metadata.interfaces';

interface props {
    metadataDB: MetadataDataI
}
const Configuration: FC<props> = ({ metadataDB }) => {
    const [openModal, setOpenModal] = useState(false)
    const [modalTitle, setModalTitle] = useState<string>('Nuevas Claves')
    const [metadata, setMetadata] = useState<MetadataDataI | null>(metadataDB)

    const showModal = (type?: 'CREATE' | 'MODIFY') => {
        switch (type) {
            case 'CREATE':
                setModalTitle('Nuevas Claves')
                break
            case 'MODIFY':
                setModalTitle('Claves Actualizado')
                break
            default:
                setModalTitle('Información de las claves')
                break
        }
        setOpenModal(true)
    }

    const changeMetadata = (metadata: MetadataDataI) => {
        setMetadata(metadata)
    }


    const closeModal = () => {
        setOpenModal(false)
    }



    return (
        <>
            <Row>
                <Col span={24}>
                    <CardContainer cardStyle={{ marginLeft: '22px' }}>
                        <Typography.Title level={2}>Configuración</Typography.Title>
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
                    <KeysForm
                        showModal={showModal}
                        changeMetadata={changeMetadata}
                        metadata={metadata}
                    />
                </Col>
                <Col span={14}>
                </Col>
            </Row >
            <ModalMetadata
                modalTitle={modalTitle}
                openModal={openModal}
                metadata={metadata}
                closeModal={closeModal}
            />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const metadata = await axios.get(process.env.FRONT_URL+'/api/metadata')

    return {
        props: {
            metadataDB: metadata.data.length > 0 ? metadata.data[0] : null
        }
    }
}

export default Configuration