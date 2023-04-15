import { Avatar, Col, Row, Spin, Typography } from "antd"
import { UserOutlined } from '@ant-design/icons'
import { useGet } from "../../../hooks/useGet"
import { getPromoters } from '../../../services/promoter_s'
import CardContainer from "../../containers/CardContainer"
import { PromoterDataI } from "../../../interfaces/promoter.interfaces"
import { FC, useEffect } from "react"

interface props {
    promoters: PromoterDataI[] | unknown | any
    changePromoter: (promoter: PromoterDataI) => void
    showModal: () => void
    editMode: boolean
    loadingList: boolean
}

const PromotoresList: FC<props> = ({ promoters, changePromoter, showModal, editMode, loadingList }) => {

    function isEven(n: number) {
        return n % 2 == 0;
    }

    useEffect(() => {
        console.log("data")
    }, [editMode])

    return (
        <Spin spinning={loadingList}>
            <Row style={{
                maxHeight: '34rem',
                overflowY: promoters?.length > 5 ? 'scroll' : 'hidden',
                overflowX: 'hidden',
            }}>

                {
                    promoters && promoters.length > 0 ? promoters.map((el: PromoterDataI, index: number) => (
                        <Col span={24} key={el?._id}>
                            <CardContainer
                                textList={[
                                    `${el.name}`,
                                    `${el.last_name}`,
                                    `${el.promoter_codes[0]}`
                                ]}
                                iconOrImg={
                                    <Avatar
                                        style={{
                                            backgroundColor: isEven(index) ? '#f56a00' : '#7265e6',
                                            verticalAlign: 'middle'
                                        }}
                                        size="large">
                                        {el?.name?.substring(0, 1).toUpperCase()}{el?.last_name?.substring(0, 1).toUpperCase()}
                                    </Avatar>
                                }
                                iconOrImgStyle={{
                                    height: '40px',
                                    width: '100%'
                                }}
                                cardStyle={{
                                    marginBottom: '1rem',
                                    marginRight: '6px'
                                }}
                                responsiveText
                                direction="horizontal"
                                contrastColor="transparent"
                                hoverEffect
                                onClick={() => {
                                    const findPromoter = promoters.find((item: PromoterDataI) => item._id === el._id)
                                    changePromoter(findPromoter)
                                    showModal()
                                }}
                            />

                        </Col>
                    )) : (
                        <p>No hay data</p>
                    )
                }

            </Row>
        </Spin>
    )
}
export default PromotoresList