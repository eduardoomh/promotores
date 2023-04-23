import { Typography, Divider, Form, Row, Col, message, Spin } from "antd"
import CardContainer from "../../containers/CardContainer"
import InputContainer from "../../containers/InputContainer"
import { addUser, editUser } from '../../../services/user_s'
import { usePost } from "../../../hooks/usePost"
import { usePatch } from "../../../hooks/usePatch"
import { FC, useEffect } from "react"
import { NewUserDataI, UserDataI } from "../../../interfaces/user.interfaces"

interface props {
  showModal: (type?: 'CREATE' | 'MODIFY') => void
  changeUser: (promoter: UserDataI) => void
  changeLoadingList: (state: boolean) => void
  changeEditMode: (state: boolean) => void
  refetchingPromotors: () => void
  pushUser: (user: UserDataI) => void
  editMode: boolean
  user: UserDataI | undefined
}

const UsuariosForm: FC<props> = ({ 
    showModal, 
    changeUser, 
    editMode, 
    user, 
    refetchingPromotors, 
    changeLoadingList, 
    changeEditMode, 
    pushUser }) => {
  const [form] = Form.useForm()
  const { fetchData, isLoading: isLoadingCreate } = usePost(addUser)
  const { fetchDataPatch, isLoadingPatch, dataPatch } = usePatch(editUser)

  const onFinish = async (data: NewUserDataI) => {
    try {
      changeLoadingList(true)
      const response = await fetchData({
        user: {
          email: data.email,
          password: data.password,
          role: data.role,
        }
      })

      if (!response.error) {
        form.resetFields()
        message.success('El usuario ha sido guardado exitosamente.')
        pushUser(response.data as UserDataI)
        showModal('CREATE')
        setTimeout(() => {
          changeLoadingList(false)
        }, 1000)


      }else{
        //@ts-ignore
        message.error(response.error.message)
        changeLoadingList(false)
      }

    } catch (error) {
      console.log(error)
      message.error('Ha ocurrido un error inesperado.')
      changeLoadingList(false)
    }
  }

  const onFinishEdit = async (data: NewUserDataI) => {
    try {
      changeLoadingList(true)
      const response = await fetchDataPatch(
        user?._id as string,
        {
          user: {
            email: data.email,
            password: data.password,
            role: data.role,
          }
        })
        console.log(response, "respuestsss")

      if (!response?.error) {
        changeUser(dataPatch as UserDataI)
        message.success('El usuario ha sido actualizado exitosamente.')
        showModal('MODIFY')
        changeEditMode(false)
        refetchingPromotors()
        changeLoadingList(false)
      } else {
        message.error('Ha ocurrido un Error inesperado!')
        changeLoadingList(false)
      }
    } catch (error: any) {
      console.log(error.response, "rrrr")
      message.error('Ha ocurrido un Error inesperado')
      changeLoadingList(false)
    }
  }

  useEffect(() => {
    if (editMode) {
      form.setFieldsValue({
        email: user?.email,
        password: user?.password,
      })
    } else {
      form.resetFields()
    }
  }, [editMode])


  return (
    <CardContainer>
      <Typography.Title level={4}>
        {editMode ? 'Modificar Usuario' : 'Crear nuevo Usuario'}
      </Typography.Title>
      <Divider />
      <Form form={form} onFinish={editMode ? onFinishEdit : onFinish}>
        <Spin spinning={editMode ? isLoadingPatch : isLoadingCreate}>
          <Row>
            <Col span={24}>
              <Typography>Correo</Typography>
              <InputContainer
                type="email"
                required
                placeholder='Correo'
                valueContainerName="email"
              />
            </Col>
          </Row>
          <Row gutter={[10, 5]}>
            <Col span={24}>
              <Typography>Contraseña</Typography>
              <InputContainer
                type="password"
                required
                placeholder='Contraseña'
                valueContainerName="password"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Typography>Rol de usuario</Typography>
              <InputContainer
                type="select"
                required
                placeholder='Rol de usuario'
                valueContainerName="role"
                optionsList={[
                    {value: "admin", label: "Admin"},
                    {value: "promoter", label: "Promotor"}
                ]}

              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <InputContainer
                title={editMode ? 'Modificar Usuario' : 'Crear usuario'}
                type="submitButton"
              />
            </Col>
          </Row>
        </Spin>
      </Form>
    </CardContainer>
  )
}

export default UsuariosForm