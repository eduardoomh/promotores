import { Row } from "antd"
import { FC } from "react"
import CardContainer from "../../containers/CardContainer"
import ViewItem from "../ViewItem"
import moment from "moment"
import { MovementDataI } from "../../../interfaces/movement.interfaces"

interface props {
    movement: MovementDataI | undefined
}
const MovementView: FC<props> = ({ movement }) => {

    return (
        <Row>
            <CardContainer>
                <ViewItem label='Usuario' text={`${movement?.promoter.name} ${movement?.promoter.last_name} `} />
                <ViewItem label='Correo' text={`${movement?.promoter.email}`} />
                <ViewItem label='Código' text={``} tagList={[`${movement?.code}`]} />
                <ViewItem label='Comisión' text={`${movement?.commission}`} />
                <ViewItem label='Descuento' text={`${movement?.discount}`} />
                <ViewItem label='Saldo Anterior' text={`${movement?.balance.before}`} />
                <ViewItem label='Saldo Posterior' text={`${movement?.balance.after}`} />
                <ViewItem label='Cantidad' text={`${movement?.balance.amount}`} />
                <ViewItem label='Registro' text={moment(movement?.created_at).format("DD-MM-YYYY")} />
            </CardContainer>
        </Row>
    )

}

export default MovementView