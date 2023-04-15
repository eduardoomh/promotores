import { Col, Divider, Row, Typography } from "antd"
import { FC } from "react"
import { PromoterDataI } from "../../../interfaces/promoter.interfaces"
import CardContainer from "../../containers/CardContainer"
import ViewItem from "../ViewItem"

interface props {
    promoter: PromoterDataI | undefined
}
const PromoterView: FC<props> = ({ promoter }) => {

    return (
        <Row>
            <CardContainer>
                <ViewItem label='Nombre' text={`${promoter?.name} ${promoter?.last_name}`} />
                <ViewItem label='Correo' text={promoter?.email} />
                <ViewItem label='Teléfono de Casa' text={promoter?.phone} />
                <ViewItem label='Teléfono Celular' text={promoter?.cell_phone} />
                <ViewItem label='RFC' text={promoter?.rfc} />
                <ViewItem label='Dirección' text={promoter?.address} />
                <ViewItem label='Código postal' text={promoter?.postal_code} />
                <ViewItem label='Códigos promocionales' tagList={promoter?.promoter_codes} />
            </CardContainer>
        </Row>
    )

}

export default PromoterView