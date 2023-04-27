import { FC } from "react"
import CardContainer from "../../containers/CardContainer"
import { Col, Row } from "antd"
import { StatsI } from "../../../interfaces/app.interfaces"

interface props{
    stats: StatsI
}

const AdminDashboard: FC<props> = ({stats}) => {

    return (
        <Row gutter={[20, 20]} style={{marginTop: "2rem"}}>
            <Col xs={24} md={6}>
                <CardContainer
                    title="Administradores"
                    subtitle={`${stats?.admins}`}
                    titleStyle={{ fontSize: "1rem" }}
                />

            </Col>
            <Col xs={24} md={6}>
                <CardContainer
                    title="promotores"
                    subtitle={`${stats?.promoters}`}
                    titleStyle={{ fontSize: "1rem" }}
                />

            </Col>
            <Col xs={24} md={6}>
                <CardContainer
                    title="Comisiones"
                    subtitle={`${stats?.commissions}`}
                    titleStyle={{ fontSize: "1rem" }}
                />
            </Col>
            <Col xs={24} md={6}>
                <CardContainer
                    title="Pagos"
                    subtitle={`${stats?.movements}`}
                    titleStyle={{ fontSize: "1rem" }}
                />
            </Col>

        </Row>
    )
}

export default AdminDashboard