import { Typography, Divider, Form, Row, Col, message, Spin, Button, Tag } from "antd"
import CardContainer from "../../containers/CardContainer"
import InputContainer from "../../containers/InputContainer"
import { addCommission, editCommission } from '../../../services/commission_s'
import { usePost } from "../../../hooks/usePost"
import { usePatch } from "../../../hooks/usePatch"
import { PromoterDataI } from "../../../interfaces/promoter.interfaces"
import { FC, useEffect, useState } from "react"
import { CommissionDataI, CouponDetailsI, NewCommissionDataI } from "../../../interfaces/commission.interfaces"
import { wooGetSpecificCoupons } from "../../../utils/wooFetch"
import CouponView from "./CouponView";

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

const CommissionForm: FC<props> = ({
    showModal,
    changeCommission,
    editMode,
    commission,
    changeLoadingList,
    changeEditMode,
    pushCommission,
    promoters
}) => {
    const [form] = Form.useForm()
    const { fetchData, isLoading: isLoadingCreate } = usePost(addCommission)
    const { fetchDataPatch, isLoadingPatch, dataPatch } = usePatch(editCommission)
    const [coupons, setCoupons] = useState<string[]>([])
    const [selectedCoupon, setSelectedCoupon] = useState(null)
    const [couponModal, setCouponModal] = useState<boolean>(false)
    const [couponsWithProducts, setCouponswithProducts] = useState<CouponDetailsI[] | null>(null)
    const [selectedDiscount, setSelectedDiscount] = useState<any | null>(null)

    const openCouponModal = () => {
        setCouponModal(!couponModal)
    }

    const couponsByCode = async (code: string) => {
        try {
            const result = await wooGetSpecificCoupons(code)
            setCouponswithProducts(result.response)
        } catch (error) {
            console.log(error)
        }
    }

    const selectedCouponDetail = () => {
        return couponsWithProducts?.find(el => el.id === selectedDiscount)
    }

    const onFinish = async (data: NewCommissionDataI) => {
        try {
            changeLoadingList(true)
            const response = await fetchData({
                commission: {
                    promoter: data.promoter,
                    code: data.code,
                    coupon: couponsWithProducts?.find(el => el?.id === selectedDiscount) as CouponDetailsI,
                    discount_type:
                        selectedCouponDetail()?.discount_type === 'percent'
                            ? 'Porcentaje'
                            : 'Cantidad',
                    discount: data.discount,
                    commission: data.commission
                }
            })
            if (!response.error) {
                form.resetFields()
                setCouponswithProducts(null)
                setSelectedCoupon(null)
                setSelectedDiscount(null)
                message.success('La comisión ha sido guardado exitosamente.')
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
            const response = await fetchDataPatch(
                commission?._id as string,
                {
                    commission: {
                        promoter: data.promoter,
                        code: data.code,
                        coupon: couponsWithProducts?.find(el => el.id === selectedDiscount) as CouponDetailsI,
                        discount: data.discount,
                        discount_type:
                            (couponsWithProducts?.find(el => el.id === selectedDiscount) as CouponDetailsI).discount_type === 'percent'
                                ? 'Porcentaje'
                                : 'Cantidad',
                        commission: data.commission
                    }
                })

            if (!response?.error) {
                changeCommission(response?.data as CommissionDataI) 
                message.success('La comisión ha sido actualizado exitosamente.')
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

    useEffect(() => {
        if (selectedDiscount !== null) {
            form.setFieldsValue({
                discount: Number((couponsWithProducts?.find((el: CouponDetailsI) => el.id === selectedDiscount) as CouponDetailsI).amount),
            })
        }
    }, [selectedDiscount])

    useEffect(() => {
        if (editMode) {
            setCouponswithProducts([commission?.coupon] as any)
            setSelectedCoupon(commission?.code as any)
            setSelectedDiscount(commission?.coupon.id as any)
            form.setFieldsValue({
                promoter: commission?.promoter._id,
                code: commission?.code,
                discount: commission?.discount,
                commission: commission?.commission
            })
        } else {
            setCouponswithProducts(null)
            setSelectedCoupon(null)
            setSelectedDiscount(null)
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
                                            label: `${el.name} ${el.last_name} - ${el.email}`,
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
                                onChange={(e) => {
                                    setSelectedCoupon(e)
                                    setSelectedDiscount(null)
                                    setCouponswithProducts(null)
                                }}

                            />
                        </Col>
                        <Col span={24}>
                            {
                                selectedCoupon && (
                                    <>
                                        <Typography>Seleccionar cupón</Typography>
                                        {
                                            !selectedDiscount ? (
                                                <Button
                                                    style={{
                                                        marginBottom: "2rem",
                                                        marginTop: "0.5rem"
                                                    }}
                                                    onClick={() => {
                                                        setCouponModal(true)
                                                        couponsByCode(selectedCoupon)
                                                    }}
                                                    disabled={selectedDiscount ? true : false}
                                                >
                                                    {'Seleccionar cupón'}
                                                </Button>
                                            ) : <Tag color="cyan" >Seleccionado</Tag>
                                        }
                                        {
                                            selectedDiscount && (
                                                <>
                                                    <Button
                                                        style={{
                                                            marginBottom: "2rem",
                                                            marginTop: "0.5rem",
                                                            marginLeft: '1rem'
                                                        }}
                                                        onClick={() => {
                                                            if(editMode){
                                                                setCouponswithProducts(null)
                                                                couponsByCode(selectedCoupon)
                                                            }
                                                            openCouponModal() 
                                                        }}
                                                    >
                                                        volver a seleccionar
                                                    </Button>
                                                </>
                                            )
                                        }

                                    </>
                                )
                            }
                            <Col span={24}>
                                {
                                    selectedDiscount && (
                                        <>

                                            <p>{selectedCouponDetail()?.description || 'Productos del cupón'}</p>
                                            {
                                                selectedCouponDetail()?.products.map((product, index) => (
                                                    <img
                                                        key={index}
                                                        style={{
                                                            border: '1px solid #d9d9d9',
                                                            marginRight: '0.5rem',
                                                            marginBottom: '0.5rem'
                                                        }}
                                                        src={product.image}
                                                        height={120}
                                                        alt={product.description}
                                                    />
                                                ))
                                            }
                                        </>
                                    )


                                }
                                < br />
                                <br />
                            </Col>


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
                                disabled={selectedDiscount ? true : false}
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
                                title={editMode ? 'Modificar Comisión' : 'Crear Comisión'}
                                type="submitButton"
                            />
                        </Col>
                    </Row>
                </Spin>
                <CouponView
                    couponModal={couponModal}
                    selectedCoupon={selectedCoupon}
                    couponsWithProducts={couponsWithProducts}
                    openCouponModal={openCouponModal}
                    setSelectedDiscount={setSelectedDiscount}
                />
            </Form>
        </CardContainer>
    )
}

export default CommissionForm