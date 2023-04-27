import { Row } from "antd"
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
        <Row>
            <CardContainer>
                <ViewItem label='Usuario' text={`${comission?.promoter.name} ${comission?.promoter.last_name}`} />
                <ViewItem label='Correo' text={`${comission?.promoter.email}`} />
                <ViewItem label='Código' text={``} tagList={[`${comission?.code}`]} />
                <ViewItem label='Comisión' text={`${comission?.commission}`} />
                <ViewItem label='Descuento' text={`${comission?.discount}`} />
                <ViewItem label='Registro' text={moment(comission?.created_at).format("DD-MM-YYYY")} />
                <ViewItem label='Modificado' text={moment(comission?.updated_at).format("DD-MM-YYYY")} />
            </CardContainer>
        </Row>
    )

}

export default ComissionView