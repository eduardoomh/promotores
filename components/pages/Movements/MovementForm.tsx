import { Typography, Divider, Form, Row, Col, message, Spin, Select } from "antd"
import CardContainer from "../../containers/CardContainer"
import InputContainer from "../../containers/InputContainer"
import { addCommission, editCommission, getCommissionsByUser } from '../../../services/commission_s'
import { usePost } from "../../../hooks/usePost"
import { usePatch } from "../../../hooks/usePatch"
import { NewPromoterDataI, PromoterDataI } from "../../../interfaces/promoter.interfaces"
import { FC, useEffect, useState } from "react"
import { CommissionDataI, NewCommissionDataI } from "../../../interfaces/commission.interfaces"
import { MovementDataI } from "../../../interfaces/movement.interfaces"
import { WooGetDataI, wooGetOrders } from "../../../utils/wooFetch"
import { StoreOrder } from "../../../interfaces/orders.interfaces"
import { addMovement } from "../../../services/movement_s"

interface props {
    showModal: (type?: 'CREATE' | 'MODIFY') => void
    changeMovement: (movement: MovementDataI) => void
    changeLoadingList: (state: boolean) => void
    changeEditMode: (state: boolean) => void
    pushMovement: (movement: MovementDataI) => void
    editMode: boolean
    movement: MovementDataI | undefined
    promoters: PromoterDataI[]
}

const MovementForm: FC<props> = ({ showModal, changeMovement, editMode, movement, changeLoadingList, changeEditMode, pushMovement, promoters }) => {
    const [form] = Form.useForm()
    const { fetchData, isLoading: isLoadingCreate } = usePost(addMovement)
    const { fetchDataPatch, isLoadingPatch, dataPatch } = usePatch(editCommission)
    const { fetchData: fetchDataCommissions, isLoading: isLoadingCommissions } = usePost(getCommissionsByUser)
    const [commissions, setCommissions] = useState<CommissionDataI[]>([])
    const [orders, setOrders] = useState<StoreOrder[]>([])

    const onFinish = async (data: any) => {
        console.log(data)
        try {
            changeLoadingList(true)
            const response = await fetchData({
                movement: {
                    order_number: orders.find(el => el.id === data.order)?.order_number as string,
                    promoter: commissions.find(el => el._id === data.commission)?.promoter._id as string,
                    code: commissions.find(el => el._id === data.commission)?.code as string,
                    discount: commissions.find(el => el._id === data.commission)?.discount as number,
                    commission: commissions.find(el => el._id === data.commission)?.commission as number,
                    amount: data.amount
                }
            })
            if (!response.error) {
                form.resetFields()
                message.success('El movimiento ha sido guardado exitosamente.')
                console.log(response.data, "esta dataaa")
                pushMovement(response.data as MovementDataI)
                showModal('CREATE')
                setTimeout(() => {
                    changeLoadingList(false)
                }, 400)
            } else {
                //@ts-ignore
                message.error(response.error.message)
            }

        } catch (error) {
            console.log(error)
            message.error('Ha ocurrido un error inesperado.')
            changeLoadingList(false)
        }
    }

    const onFinishEdit = async (data: NewCommissionDataI) => {
        try { 
            /*
            changeLoadingList(true)
            console.log("mira la informacion", data)
            const response = 
           
            const response = await fetchDataPatch(
                movement?._id as string,
                {
                    commission: {
                        promoter: data.promoter,
                        code: data.code,
                        discount: data.discount,
                        commission: data.commission
                    }
                })
               
            console.log(dataPatch, "data patch", response)

            if (!response?.error) {
                changeMovement(dataPatch as MovementDataI)
                message.success('El promotor ha sido actualizado exitosamente.')
                showModal('MODIFY')
                changeEditMode(false)
                changeLoadingList(false)
            } else {
                message.error('Ha ocurrido un Error inesperado!')
                changeLoadingList(false)
            }


 */

        } catch (error: any) {
            console.log(error)
            message.error('Ha ocurrido un Error inesperado')
            changeLoadingList(false)
        }
    }


    const getCommissions = async (id: string) => {
        const response = await fetchDataCommissions(id);

        if (!response.error && response.data) {
            const commissions = response.data as CommissionDataI[]
            setCommissions(commissions)
        }

    }

    const getOrders = async () => {
        const { success, response }: WooGetDataI = await wooGetOrders()
        if (success) {
            const orders: StoreOrder[] = response;
            setOrders(orders)
        }
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

    useEffect(() => {

    }, [orders])

    return (
        <CardContainer>
            <Typography.Title level={4}>
                {editMode ? 'Modificar nuevo pago' : 'Crear nuevo pago'}
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
                                onChange={(value) => getCommissions(value)}
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
                            <Typography>Criterio de comisión</Typography>
                            <InputContainer
                                type="select"
                                required
                                placeholder='Criterio de comisión'
                                valueContainerName="commission"
                                onChange={() => getOrders()}
                                optionsList={
                                    commissions && commissions.map((el: CommissionDataI) => {
                                        return {
                                            value: el._id,
                                            label: `${el.code} - Descuento: $${el.discount} - Comisión: $${el.commission}`,
                                        }
                                    })
                                }

                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Typography>Pedido a pagar</Typography>
                            <InputContainer
                                type="select"
                                required
                                placeholder='Pedido a pagar'
                                valueContainerName="order"
                                optionsList={
                                    orders && orders.map((el: StoreOrder) => {
                                        return {
                                            value: el.id,
                                            label: `#${el.order_number} - ${el?.product_items[0] && el?.product_items[0]?.name?.split('<span>')[0]}`,
                                        }
                                    })
                                }

                            />
                        </Col>
                    </Row>
                    <Row gutter={[10, 5]}>
                        <Col span={24}>
                            <Typography>Cantidad</Typography>
                            <InputContainer
                                type="number"
                                required
                                placeholder='Pago'
                                valueContainerName="amount"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <InputContainer
                                title={editMode ? 'Modificar Pago' : 'Generar pago'}
                                type="submitButton"
                            />
                        </Col>
                    </Row>
                </Spin>
            </Form>
        </CardContainer>
    )
}

export default MovementForm