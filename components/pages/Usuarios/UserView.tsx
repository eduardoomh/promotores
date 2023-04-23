import { Row} from "antd"
import { FC } from "react"
import CardContainer from "../../containers/CardContainer"
import ViewItem from "../ViewItem"
import { UserDataI } from "../../../interfaces/user.interfaces"
import moment from "moment"

interface props {
    user: UserDataI | undefined
}
const UserView: FC<props> = ({ user }) => {

    return (
        <Row>
            <CardContainer>
                <ViewItem label='Correo' text={user?.email} />
                <ViewItem label='Rol' text={user?.role} />
                <ViewItem label='Registro' text={moment(user?.created_at).format("DD-MM-YYYY")} />
                
            </CardContainer>
        </Row>
    )

}

export default UserView