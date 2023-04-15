import { Row, Popconfirm, Button, Spin } from "antd"
import {
    EditOutlined,
    DeleteOutlined,
    QuestionCircleOutlined
  } from '@ant-design/icons'
import { FC } from "react"
import ModalContainer, { modalHeight, modalSizes } from "../../containers/ModalContainer"
import PromoterView from "./PromoterView"
import { PromoterDataI } from "../../../interfaces/promoter.interfaces"

interface props{
    modalTitle: string;
    openModal: boolean;
    promoter: PromoterDataI | undefined;
    isLoadingDelete: boolean;
    closeModal: () => void;
    changeEditMode: (state: boolean) => void;
    dropPromoter: (id: string) => void;
    
}
const ModalPromoter: FC<props> = ({modalTitle, openModal, closeModal, isLoadingDelete, promoter, dropPromoter, changeEditMode}) =>{
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
              title='Está seguro que desea eliminar este promotor?'
              onConfirm={() => dropPromoter(promoter?._id as string)}
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
          <PromoterView
            promoter={promoter}
          />
        </Spin>
      </ModalContainer>
    )
}

export default ModalPromoter