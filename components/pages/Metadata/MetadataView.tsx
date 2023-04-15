import { Row } from "antd"
import { FC } from "react"
import { MetadataDataI } from "../../../interfaces/metadata.interfaces"
import CardContainer from "../../containers/CardContainer"
import ViewItem from "../ViewItem"

interface props {
    metadata: MetadataDataI | null
}
const MetadataView: FC<props> = ({ metadata }) => {

    return (
        <Row>
            <CardContainer>
                <ViewItem label='Clave del cliente' text={metadata?.store_keys.client_id} />
                <ViewItem label='Clave Secreta' text={metadata?.store_keys.client_secret} />
                <ViewItem label='URL de la tienda' text={metadata?.store_keys.store_url} />
            </CardContainer>
        </Row>
    )

}

export default MetadataView