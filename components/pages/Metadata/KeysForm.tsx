import { Typography, Divider, Form, Row, Col, message, Spin } from "antd"
import CardContainer from "../../containers/CardContainer"
import InputContainer from "../../containers/InputContainer"
import { addMetadata, editMetadata } from '../../../services/metadata_s'
import { usePost } from "../../../hooks/usePost"
import { FC, useEffect } from "react"
import { MetadataDataI, StoreKeys } from "../../../interfaces/metadata.interfaces"
import { usePatch } from "../../../hooks/usePatch"

interface props {
    showModal: (type?: 'CREATE' | 'MODIFY') => void
    changeMetadata: (metadata: MetadataDataI) => void;
    metadata: MetadataDataI | null;
}

const KeysForm: FC<props> = ({ showModal, changeMetadata, metadata }) => {
    const [form] = Form.useForm()
    const { fetchData, isLoading: isLoadingCreate, data: createData } = usePost(addMetadata)
    const { fetchDataPatch, isLoadingPatch, dataPatch } = usePatch(editMetadata)

    const onFinish = async (data: StoreKeys) => {
        try {
            console.log("mira la informacion", data)
            const response = await fetchData({
                store_keys: {
                    client_id: data.client_id,
                    client_secret: data.client_secret,
                    store_url: data.store_url,
                }

            })
            console.log(response, "hay response", createData)
            if (!response.error) {
                changeMetadata(response.data as MetadataDataI)
                message.success('Las claves han sido guardado exitosamente.')
                showModal('CREATE')

            }

        } catch (error) {
            console.log(error)
            message.error('Ha ocurrido un error inesperado.')
        }
    }

    const onFinishEdit = async (data: StoreKeys) => {
        try {
            console.log("mira la informacion", data)
            const response = await fetchDataPatch(
                metadata?._id as string,
                {
                    store_keys: {
                        client_id: data?.client_id,
                        client_secret: data?.client_secret,
                        store_url: data?.store_url,
                    }

                })
            console.log(response, "hay response", createData)
            if (!response?.error) {
                changeMetadata(dataPatch as MetadataDataI)
                message.success('Las claves han sido guardado exitosamente.')
                showModal('MODIFY')

            }

        } catch (error) {
            console.log(error)
            message.error('Ha ocurrido un error inesperado.')
        }
    }

    useEffect(() => {
        if (metadata !== null) {
            form.setFieldsValue({
                client_id: metadata?.store_keys?.client_id,
                client_secret: metadata?.store_keys?.client_secret,
                store_url: metadata?.store_keys?.store_url,
            })
        }
    }, [metadata])

    return (
        <CardContainer>
            <Typography.Title level={4}>
                {metadata !== undefined ? 'Modificar claves de acceso' : 'Crear nuevas Claves'}
            </Typography.Title>
            <Divider />
            <Form form={form} onFinish={metadata !== null ? onFinishEdit : onFinish}>
                <Spin spinning={isLoadingCreate}>
                    <Row>
                        <Col span={24}>
                            <Typography>Url de la tienda</Typography>
                            <InputContainer
                                type="text"
                                required
                                placeholder='URL de la tienda'
                                valueContainerName="store_url"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Typography>Clave del cliente</Typography>
                            <InputContainer
                                type="password"
                                required
                                placeholder='Clave del cliente'
                                valueContainerName="client_id"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Typography>Clave secreta</Typography>
                            <InputContainer
                                type="password"
                                required
                                placeholder='Clave Secreta'
                                valueContainerName="client_secret"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <InputContainer
                                title={metadata !== null ? 'Modificar Claves' : 'Guardar Claves'}
                                type="submitButton"
                            />
                        </Col>
                    </Row>
                </Spin>
            </Form>
        </CardContainer>
    )
}

export default KeysForm