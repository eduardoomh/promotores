import { Button,Col, Collapse, Row, Spin, Tag, Typography } from "antd"
import ModalContainer, { modalHeight, modalSizes } from "../../containers/ModalContainer"
import CardContainer from "../../containers/CardContainer"
import moment from "moment"
import { FC, useEffect, useState } from "react";
import ViewItem from "../ViewItem";
const { Panel } = Collapse;
import {
    CheckCircleOutlined
} from '@ant-design/icons'
import { CouponDetailsI } from "../../../interfaces/commission.interfaces";

interface props {
    couponModal: boolean;
    selectedCoupon: string | null;
    couponsWithProducts: CouponDetailsI[] | null;
    openCouponModal: () => void;
    setSelectedDiscount: any;
}

const CouponView: FC<props> = ({ couponModal, couponsWithProducts, openCouponModal, selectedCoupon, setSelectedDiscount }) => {
    const [loadingView, setLoadingView] = useState(true)

    useEffect(() => {
        if (couponsWithProducts !== null) {
            setLoadingView(false)
        }else{
            setLoadingView(true)
        }
    }, [couponsWithProducts])

    return (
        <ModalContainer
            title={'Seleccionar cupón'}
            visible={couponModal}
            onOk={openCouponModal}
            onCancel={openCouponModal}
            height={modalHeight.BIG}
            width={modalSizes.EXTRABIG}
            footer={[
                <Row justify="end">
                    <Button onClick={openCouponModal} >
                        Cerrar
                    </Button>
                </Row>
            ]}
        >
            <Spin spinning={loadingView}>
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        <Typography style={{ fontWeight: 'bold', fontSize: '0.9rem' }} >
                            Selecciona el cupón con la comisión y productos correctos del código:
                            <Tag style={{ marginLeft: '0.5rem', fontSize: '1rem' }}>{selectedCoupon}</Tag> </Typography>
                    </Col>
                    <Col span={24}>
                        <Collapse
                            expandIconPosition={'start'}
                        >
                            {
                                couponsWithProducts !== null && couponsWithProducts.map((coupon, index) =>
                                    <>
                                        <Panel
                                            header={`${coupon.code}`} key={`${index + 1}`}
                                        >
                                            <CardContainer>
                                                <ViewItem
                                                    label='Cantidad'
                                                    text={
                                                        `${coupon.amount} ${coupon.discount_type === 'percent'
                                                            ? '%' : 'MXN'
                                                        }`
                                                    }
                                                />
                                                <ViewItem label='Fecha de creación' text={moment(coupon.created_at).format("DD-MM-YYYY")} />
                                                <Row gutter={[20, 20]} >
                                                    <Col span={24}>
                                                        <strong style={{ fontSize: '1rem' }}>Productos seleccionados</strong>
                                                    </Col>
                                                    {
                                                        coupon.products.map((product: any) => (
                                                            <Col sm={24} md={12} xl={8} xxl={8}>
                                                                <CardContainer
                                                                    title={product.name}
                                                                    iconOrImg={
                                                                        <img
                                                                            width={'100%'}
                                                                            src={product.image}
                                                                        />
                                                                    }
                                                                    iconOrImgStyle={{
                                                                        width: '100%'
                                                                    }}
                                                                    titleStyle={{
                                                                        marginTop: '0.5rem',
                                                                        fontSize: '0.8rem'
                                                                    }}
                                                                />
                                                            </Col>
                                                        ))
                                                    }
                                                </Row>
                                                <br />
                                                <hr />
                                                <br />
                                                <Button
                                                    onClick={() => {
                                                        setSelectedDiscount(coupon.id)
                                                        openCouponModal()
                                                    }
                                                    }
                                                    style={{ display: 'flex', alignItems: 'center' }}
                                                    icon={<CheckCircleOutlined />}
                                                    type="primary"
                                                    ghost
                                                >
                                                    Seleccionar Cupón
                                                </Button>
                                            </CardContainer>
                                        </Panel>

                                    </>
                                )
                            }
                        </Collapse>
                        <br />
                    </Col>
                </Row>
            </Spin>
        </ModalContainer>
    )
}

export default CouponView