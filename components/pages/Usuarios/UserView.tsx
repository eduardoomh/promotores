import { Row} from "antd"
import { FC } from "react"
import CardContainer from "../../containers/CardContainer"
import ViewItem from "../ViewItem"
import { UserDataI } from "../../../interfaces/user.interfaces"
import moment from "moment"
import { getUserRole } from "../../../utils/formatDataHelpers"

interface props {
    user: UserDataI | undefined
}

const UserView: FC<props> = ({ user }) => {

    return (
        <Row>
            <CardContainer>
                <ViewItem label='Nombre' text={user?.name} />
                <ViewItem label='Correo' text={user?.email} />
                <ViewItem label='Rol' text={""} tagList={[getUserRole(user?.role || 'admin')]} />
                <ViewItem label='Registro' text={moment(user?.created_at).format("DD-MM-YYYY")} />
                <ViewItem label='Actualizado' text={moment(user?.updated_at).format("DD-MM-YYYY")} />
                
            </CardContainer>
        </Row>
    )

}

export default UserView