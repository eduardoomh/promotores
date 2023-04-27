import { Row, Popconfirm, Button, Spin } from "antd"
import {
    EditOutlined,
    DeleteOutlined,
    QuestionCircleOutlined
  } from '@ant-design/icons'
import { FC } from "react"
import ModalContainer, { modalHeight, modalSizes } from "../../containers/ModalContainer"
import UserView from "./UserView"
import { UserDataI } from "../../../interfaces/user.interfaces"

interface props{
    modalTitle: string;
    openModal: boolean;
    user: UserDataI | undefined;
    isLoadingDelete: boolean;
    closeModal: () => void;
    changeEditMode: (state: boolean) => void;
    dropUser: (id: string) => void;
    
}
const ModalUser: FC<props> = ({modalTitle, openModal, closeModal, isLoadingDelete, user, dropUser, changeEditMode}) =>{
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
              title='Está seguro que desea eliminar este usuario?'
              onConfirm={() => dropUser(user?._id as string)}
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
          <UserView
            user={user}
          />
        </Spin>
      </ModalContainer>
    )
}

export default ModalUser