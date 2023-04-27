import { Typography, Divider, Form, Row, Col, message, Spin, Select } from "antd"
import CardContainer from "../../containers/CardContainer"
import InputContainer from "../../containers/InputContainer"
import { addPromoter, editPromoter } from '../../../services/promoter_s'
import { usePost } from "../../../hooks/usePost"
import { usePatch } from "../../../hooks/usePatch"
import { NewPromoterDataI, PromoterDataI } from "../../../interfaces/promoter.interfaces"
import { FC, useEffect, useState } from "react"
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"
import axios from "axios"
import { wooGetCoupons, WooGetDataI } from "../../../utils/wooFetch"
import { UserDataI } from "../../../interfaces/user.interfaces"

interface props {
  showModal: (type?: 'CREATE' | 'MODIFY') => void
  changePromoter: (promoter: PromoterDataI) => void
  changeLoadingList: (state: boolean) => void
  changeEditMode: (state: boolean) => void
  refetchingPromotors: () => void
  pushPromoters: (promoter: PromoterDataI) => void
  editMode: boolean
  promoter: PromoterDataI | undefined;
  users: UserDataI[];
}

const PromotoresForm: FC<props> = ({ 
    showModal, 
    changePromoter, 
    editMode, 
    promoter, 
    refetchingPromotors, 
    changeLoadingList, 
    changeEditMode, 
    pushPromoters,
    users
  }) => {
  const [form] = Form.useForm()
  const { fetchData, isLoading: isLoadingCreate } = usePost(addPromoter)
  const { fetchDataPatch, isLoadingPatch, dataPatch } = usePatch(editPromoter)
  const [coupons, setCoupons] = useState([])

  const onFinish = async (data: NewPromoterDataI) => {
    try {
      changeLoadingList(true)
      const response = await fetchData({
        promoter: {
          promoter_codes: data.promoter_codes,
          name: data.name,
          last_name: data.last_name,
          address: data.address,
          postal_code: data.postal_code,
          phone: data.phone,
          cell_phone: data.cell_phone,
          rfc: data.rfc,
          user_id: data.user_id
        }
      })
      console.log(response)
      if (!response.error) {
        form.resetFields()
        message.success('El promotor ha sido guardado exitosamente.')
        pushPromoters(response.data as PromoterDataI)
        showModal('CREATE')
        setTimeout(() => {
          changeLoadingList(false)
        }, 1000)


      }

    } catch (error) {
      console.log(error)
      message.error('Ha ocurrido un error inesperado.')
      changeLoadingList(false)
    }
  }

  const onFinishEdit = async (data: NewPromoterDataI) => {
    try {
      changeLoadingList(true)
      console.log("mira la informacion", data)
      const response = await fetchDataPatch(
        promoter?._id as string,
        {
          promoter: {
            promoter_codes: data.promoter_codes,
            name: data.name,
            last_name: data.last_name,
            address: data.address,
            postal_code: data.postal_code,
            phone: data.phone,
            cell_phone: data.cell_phone,
            rfc: data.rfc,
            user_id: data.user_id
          }
        })
      console.log(dataPatch, "data patch", response)

      if (!response?.error) {
        changePromoter(dataPatch as PromoterDataI)
        message.success('El promotor ha sido actualizado exitosamente.')
        showModal('MODIFY')
        changeEditMode(false)
        refetchingPromotors()
        changeLoadingList(false)
      } else {
        message.error('Ha ocurrido un Error inesperado!')
        changeLoadingList(false)
      }




    } catch (error: any) {
      console.log(error)
      message.error('Ha ocurrido un Error inesperado')
      changeLoadingList(false)
    }
  }


  const getCoupons = async () => {
    try {

      const { response }: WooGetDataI = await wooGetCoupons()
      setCoupons(response)

    } catch (error) {
      console.log('coupons', error)
    }
  }


  useEffect(() => {
    if (editMode) {
      form.setFieldsValue({
        promoter_codes: promoter?.promoter_codes,
        name: promoter?.name,
        last_name: promoter?.last_name,
        address: promoter?.address,
        postal_code: promoter?.postal_code,
        phone: promoter?.phone,
        cell_phone: promoter?.cell_phone,
        email: promoter?.email,
        rfc: promoter?.rfc,
        user_id: promoter?.user_id
      })
    } else {
      form.resetFields()
    }
  }, [editMode])

  useEffect(() => {
    getCoupons()
  }, [])

  return (
    <CardContainer>
      <Typography.Title level={4}>
        {editMode ? 'Modificar Promotor' : 'Crear nuevo Promotor'}
      </Typography.Title>
      <Divider />
      <Form form={form} onFinish={editMode ? onFinishEdit : onFinish}>
        <Spin spinning={editMode ? isLoadingPatch : isLoadingCreate}>
          <Row>
            <Col span={24}>
              <Typography>Codigos de promotor</Typography>
              <InputContainer
                type="multipleSelect"
                required
                placeholder='Códigos de promotor'
                valueContainerName="promoter_codes"
                optionsList={coupons}

              />
            </Col>
          </Row>
          <Row gutter={[10, 5]}>
            <Col span={12}>
              <Typography>Nombre</Typography>
              <InputContainer
                type="text"
                required
                placeholder='Nombre'
                valueContainerName="name"
              />
            </Col>
            <Col span={12}>
              <Typography>Apellidos</Typography>
              <InputContainer
                type="text"
                required
                placeholder='Apellidos'
                valueContainerName="last_name"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Typography>Usuario</Typography>
              <InputContainer
                type="searchSelect"
                required
                canSearch
                filter={(input: any, option: any) => (option?.label.toLowerCase() ?? '').includes(input)}
                placeholder='Usuario'
                valueContainerName="user_id"
                optionsList={
                  users && users.map((el: UserDataI) => {
                    return {
                      value: el._id,
                      label: `${el.email}`,
                    }
                  })
                }

              />
            </Col>
          </Row>
          <Row gutter={[10, 5]}>
            <Col span={12}>
              <Typography>No. teléfono</Typography>
              <InputContainer
                type="text"
                required
                placeholder='Teléfono'
                valueContainerName="phone"
              />
            </Col>
            <Col span={12}>
              <Typography>No. de celular</Typography>
              <InputContainer
                type="text"
                required
                placeholder='Celular'
                valueContainerName="cell_phone"
              />
            </Col>

          </Row>
          <Row gutter={[10, 5]}>
            <Col span={24}>
              <Typography>Dirección</Typography>
              <InputContainer
                type="text"
                required
                placeholder='Dirección'
                valueContainerName="address"
              />
            </Col>
          </Row>
          <Row gutter={[10, 5]}>
            <Col span={12}>
              <Typography>Codigo Postal</Typography>
              <InputContainer
                type="text"
                required
                placeholder='Código postal'
                valueContainerName="postal_code"
              />
            </Col>
            <Col span={12}>
              <Typography>RFC</Typography>
              <InputContainer
                type="text"
                required
                placeholder='RFC'
                valueContainerName="rfc"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <InputContainer
                title={editMode ? 'Modificar Promotor' : 'Guardar promotor'}
                type="submitButton"
              />
            </Col>
          </Row>
        </Spin>
      </Form>
    </CardContainer>
  )
}

export default PromotoresForm