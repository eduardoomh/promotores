import { Row, Popconfirm, Button, Spin } from "antd"
import {
    EditOutlined,
    DeleteOutlined,
    QuestionCircleOutlined
  } from '@ant-design/icons'
import { FC } from "react"
import ModalContainer, { modalHeight, modalSizes } from "../../containers/ModalContainer"
import ComissionView from "./ComissionView"
import { CommissionDataI } from "../../../interfaces/commission.interfaces"

interface props{
    modalTitle: string;
    openModal: boolean;
    comission: CommissionDataI | undefined;
    isLoadingDelete: boolean;
    closeModal: () => void;
    dropComission: (id: string) => void;
    changeEditMode: (state: boolean) => void;
    
}
const ModalComission: FC<props> = ({
    modalTitle, 
    openModal, 
    closeModal, 
    isLoadingDelete, 
    comission, 
    dropComission, 
    changeEditMode
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
              title='Está seguro que desea eliminarla comisión?'
              onConfirm={() => dropComission(comission?._id as string)}
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
              onClick={() => changeEditMode(true)}
              style={{ display: 'flex', alignItems: 'center' }}
              icon={<EditOutlined />}
              type="primary"
              ghost
            >
              Modificar
            </Button>
            <Button
              onClick={closeModal}
            >
              Cerrar
            </Button>
          </Row>
        ]}
      >
        <Spin spinning={isLoadingDelete}>
          <ComissionView
            comission={comission}
          />
        </Spin>
      </ModalContainer>
    )
}

export default ModalComission