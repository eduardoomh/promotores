import { Row, Button } from "antd"
import { FC } from "react"
import ModalContainer, { modalHeight, modalSizes } from "../../containers/ModalContainer"
import MetadataView from "./MetadataView"
import { MetadataDataI } from "../../../interfaces/metadata.interfaces"

interface props {
    modalTitle: string;
    openModal: boolean;
    metadata: MetadataDataI | null;
    closeModal: () => void;

}
const ModalMetadata: FC<props> = ({ modalTitle, openModal, closeModal, metadata }) => {
    return (
        <ModalContainer
            title={modalTitle}
            visible={openModal}
            onOk={closeModal}
            onCancel={closeModal}
            height={modalHeight.BIG}
            width={modalSizes.MEDIUM}
            footer={[
                <Row justify="end">
                    <Button
                        onClick={closeModal}
                    >
                        Cerrar
                    </Button>
                </Row>
            ]}
        >
            <MetadataView
                metadata={metadata}
            />
        </ModalContainer>
    )
}

export default ModalMetadata