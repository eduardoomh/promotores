import { Row, Popconfirm, Button, Spin } from "antd"
import {
    DeleteOutlined,
    QuestionCircleOutlined
  } from '@ant-design/icons'
import { FC } from "react"
import ModalContainer, { modalHeight, modalSizes } from "../../containers/ModalContainer"
import MovementView from "./MovementView"
import { MovementDataI } from "../../../interfaces/movement.interfaces"

interface props{
    modalTitle: string;
    openModal: boolean;
    movement: MovementDataI | undefined;
    isLoadingDelete: boolean;
    closeModal: () => void;
    dropMovement: (id: string) => void;
    
}
const ModalMovement: FC<props> = ({
    modalTitle, 
    openModal, 
    closeModal, 
    isLoadingDelete, 
    movement, 
    dropMovement, 
}) =>{
    return(
        <ModalContainer
        title={modalTitle}
        visible={openModal}
        onOk={closeModal}
        onCancel={closeModal}
        height={modalHeight.BIG}
        width={modalSizes.MINI}
        footer={[
          <Row justify="end">
            <Popconfirm
              placement="topLeft"
              cancelButtonProps={{ type: 'primary', ghost: true }}
              okButtonProps={{ danger: true }}
              title='Está seguro que desea eliminar el movimiento?'
              onConfirm={() => dropMovement(movement?._id as string)}
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              okText="Si"
              cancelText="No"
            >
              <Button
                icon={<DeleteOutlined />}
                style={{ display: 'flex', alignItems: 'center' }}
                danger
              >
                Eliminar
              </Button>
            </Popconfirm>
            <Button
              onClick={closeModal}
            >
              Cerrar
            </Button>
          </Row>
        ]}
      >
        <Spin spinning={isLoadingDelete}>
          <MovementView
            movement={movement}
          />
        </Spin>
      </ModalContainer>
    )
}

export default ModalMovement