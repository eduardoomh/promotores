import { Avatar, Col, Row, Tag, Typography } from "antd"
import { FC } from "react"
import CardContainer from "../../containers/CardContainer"
import ViewItem from "../ViewItem"
import moment from "moment"
import { CommissionDataI } from "../../../interfaces/commission.interfaces"

interface props {
    comission: CommissionDataI | undefined
}
const ComissionView: FC<props> = ({ comission }) => {

    return (
        <Row gutter={[0,30]}>
            <CardContainer
                cardStyle={{
                    marginBottom: '2rem'
                }}>
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        <Typography
                            style={{
                                fontWeight: 'bold',
                                fontSize: '1.1rem'
                            }}>
                            Promotor
                        </Typography>
                    </Col>

                    <Col span={24} style={{ display: 'flex', alignContent: 'center' }}>
                        <Avatar
                            size="default"
                            style={{
                                backgroundColor: 'red',
                                verticalAlign: 'middle'
                            }}>
                            {comission?.promoter?.name?.toUpperCase().charAt(0) || 'N'}
                        </Avatar>
                        <Typography
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: '0.5rem'
                            }}>
                            {comission?.promoter?.name + ' ' + comission?.promoter?.last_name}
                        </Typography>
                    </Col>
                    <Col span={24}>
                        <Typography>
                            <strong>Correo: </strong>{comission?.promoter.email}
                        </Typography>
                    </Col>
                </Row>
            </CardContainer>
            <CardContainer>
                <Col span={24}>
                    <Typography>
                        <strong>Cupón asignado: </strong> <Tag>{comission?.code}</Tag>
                    </Typography>
                    <br />
                    <Typography>
                        <strong>Descripción: </strong> {comission?.coupon.description}
                    </Typography>
                    <br />
                    <Typography>
                        <strong>Productos: </strong> 
                    </Typography>
                    <br/>
                    {
                        comission?.coupon.products.map((product, index) => (
                            <img
                                key={index}
                                src={product.image}
                                alt={product.image_name}
                                height={150}
                                style={{
                                    border: '1px solid #d9d9d9',
                                    borderRadius: '6px',
                                    marginRight: '20px',
                                    marginBottom: '20px'
                                }}
                            />
                        ))
                    }
                    <Row gutter={[20, 20]}>


                        <Col span={24}>
                            <Typography>
                                <strong>Comisión:</strong> {comission?.commission} {
                                    comission?.discount_type === 'percent' ? '%' : 'MXN'
                                }
                            </Typography>
                        </Col>
                        <Col span={24}>
                            <Typography>
                                <strong>Descuento: </strong>{comission?.discount} MXN
                            </Typography>
                        </Col>
                    </Row>

                </Col>
            </CardContainer>
            <CardContainer>
                <ViewItem label='Registro' text={moment(comission?.created_at).format("DD-MM-YYYY")} />
                <ViewItem label='Modificado' text={moment(comission?.updated_at).format("DD-MM-YYYY")} />
            </CardContainer>
        </Row>
    )

}

export default ComissionView