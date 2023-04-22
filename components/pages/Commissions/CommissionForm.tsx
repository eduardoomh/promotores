import { Typography, Divider, Form, Row, Col, message, Spin, Select } from "antd"
import CardContainer from "../../containers/CardContainer"
import InputContainer from "../../containers/InputContainer"
import { addCommission, editCommission } from '../../../services/commission_s'
import { usePost } from "../../../hooks/usePost"
import { usePatch } from "../../../hooks/usePatch"
import { NewPromoterDataI, PromoterDataI } from "../../../interfaces/promoter.interfaces"
import { FC, useEffect, useState } from "react"
import { CommissionDataI, NewCommissionDataI } from "../../../interfaces/commission.interfaces"

interface props {
    showModal: (type?: 'CREATE' | 'MODIFY') => void
    changeCommission: (commission: CommissionDataI) => void
    changeLoadingList: (state: boolean) => void
    changeEditMode: (state: boolean) => void
    pushCommission: (commission: CommissionDataI) => void
    editMode: boolean
    commission: CommissionDataI | undefined
    promoters: PromoterDataI[]
}

const CommissionForm: FC<props> = ({ showModal, changeCommission, editMode, commission, changeLoadingList, changeEditMode, pushCommission, promoters }) => {
    const [form] = Form.useForm()
    const { fetchData, isLoading: isLoadingCreate } = usePost(addCommission)
    const { fetchDataPatch, isLoadingPatch, dataPatch } = usePatch(editCommission)
    const [coupons, setCoupons] = useState<string[]>([])

    const onFinish = async (data: NewCommissionDataI) => {
        console.log(data)
        try {
            changeLoadingList(true)
            const response = await fetchData({
                commission:{
                    promoter: data.promoter,
                    code: data.code,
                    discount: data.discount,
                    commission: data.commission
                }
            })
            console.log(response)
            if (!response.error) {
                form.resetFields()
                message.success('El promotor ha sido guardado exitosamente.')
                console.log(response.data, "esta dataaa")
                pushCommission(response.data as CommissionDataI)
                showModal('CREATE')
                setTimeout(() => {
                    changeLoadingList(false)
                }, 400)


            }

        } catch (error) {
            console.log(error)
            message.error('Ha ocurrido un error inesperado.')
            changeLoadingList(false)
        }
    }

    const onFinishEdit = async (data: NewCommissionDataI) => {
        try {
            changeLoadingList(true)
            console.log("mira la informacion", data)
            const response = await fetchDataPatch(
                commission?._id as string,
                {
                    commission:{
                        promoter: data.promoter,
                        code: data.code,
                        discount: data.discount,
                        commission: data.commission
                    }
                })
            console.log(dataPatch, "data patch", response)

            if (!response?.error) {
                changeCommission(dataPatch as CommissionDataI)
                message.success('El promotor ha sido actualizado exitosamente.')
                showModal('MODIFY')
                changeEditMode(false)
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


    const getCoupons = async (id: string) => {
        const promoterCoupons = promoters.find((el: PromoterDataI) => el?._id === id)
        setCoupons(promoterCoupons?.promoter_codes as string[])
    }


    useEffect(() => {
        if (editMode) {
            form.setFieldsValue({
                promoter: '',
            })
        } else {
            form.resetFields()
        }
    }, [editMode])

    return (
        <CardContainer>
            <Typography.Title level={4}>
                {editMode ? 'Modificar nueva comisión' : 'Crear nueva comisión'}
            </Typography.Title>
            <Divider />
            <Form form={form} onFinish={editMode ? onFinishEdit : onFinish}>
                <Spin spinning={editMode ? isLoadingPatch : isLoadingCreate}>
                    <Row>
                        <Col span={24}>
                            <Typography>Promotor</Typography>
                            <InputContainer
                                type="searchSelect"
                                required
                                canSearch
                                filter={(input: any, option: any) => (option?.label.toLowerCase() ?? '').includes(input)}
                                placeholder='Promotor'
                                valueContainerName="promoter"
                                onChange={(value) => getCoupons(value)}
                                optionsList={
                                    promoters && promoters.map((el: PromoterDataI) => {
                                        return {
                                            value: el._id,
                                            label: `${el.name} ${el.last_name}`,
                                        }
                                    })
                                }

                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Typography>Código de promoción</Typography>
                            <InputContainer
                                type="select"
                                required
                                placeholder='Códigos de promotor'
                                valueContainerName="code"
                                optionsList={coupons}

                            />
                        </Col>
                    </Row>
                    <Row gutter={[10, 5]}>
                        <Col span={12}>
                            <Typography>Descuento</Typography>
                            <InputContainer
                                type="number"
                                required
                                placeholder='Descuento'
                                valueContainerName="discount"
                            />
                        </Col>
                        <Col span={12}>
                            <Typography>Comisión</Typography>
                            <InputContainer
                                type="number"
                                required
                                placeholder='Comisión'
                                valueContainerName="commission"
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

export default CommissionForm