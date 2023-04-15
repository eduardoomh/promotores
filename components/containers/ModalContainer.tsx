import React from 'react'
import { Modal, Row, Col, ModalProps } from 'antd'
import useDevice from '../../hooks/useDevice'

interface ModalContainerProps extends ModalProps {
  size?: modalSizes
  height?: modalHeight
  title: string
  children?: any
}

export enum modalSizes {
  EXTRABIG = '90%',
  BIG = '800px',
  LARGE = '700px',
  MEDIUM = '600px',
  SHORT = '500px',
  MINI = '400px'
}

export enum modalHeight {
  EXTRABIG = '80%',
  BIG = '500px',
  LARGE = '400px',
  MEDIUM = '300px',
  SHORT = '200px',
  MAX = '100%'
}

const styles = {
  title: {
    margin: 0,
    padding: 0,
    fontWeight: 'bolder',
    width: '100%',
    height: '100%',
    display: 'grid',
    placeItems: 'center left',
    color: '#2D1B6E',
    fontSize: '2em'
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '10px 0'
  },
  modalContent: {
    display: 'grid',
    alignItems: 'flex-start',
    height: '300px',
    padding: '16px 4px',
    overflow: 'hidden scroll '
  }
}

const ModalContainer: React.FC<ModalContainerProps> = (modalContainerProps) => {
  const { isMobile, isTablet } = useDevice()
  const {
    size = `${(isMobile && '100vw') || (isTablet  && '80vw') || '50vw'}`,
    height = '100%',
    visible,
    title,
    children,
    onCancel,
    onOk,
    footer,
    okType
  } = modalContainerProps


  return (
    <>
      <Modal
        centered
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        width={size}
        style={{
          borderRadius: '20px'
        }}
        footer={footer}
        okType={okType}
      >
        <Row gutter={[0, 40]} style={styles.modalHeader}>
          <Col span={24}>
            <h1 style={styles.title}>{title}</h1>
          </Col>
        </Row>
        <Row style={{ ...styles.modalContent, height }}>{children}</Row>
      </Modal>
    </>
  )
}

export default ModalContainer
