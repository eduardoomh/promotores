import { Button, Typography } from "antd"
import { FC } from "react"
import CardContainer from "../../containers/CardContainer"

interface props {
    changeEditMode: (state: boolean) => void
}
const PromoterEditMode: FC<props> = ({ changeEditMode }) => {
    return (
        <>
            <CardContainer
                textList={[
                    <Typography>
                        Modifique la información del promotor seleccionado
                    </Typography>,
                    <Button onClick={() => changeEditMode(false)}>
                        Salir del modo Edición
                    </Button>
                ]}
            />
        </>
    )
}

export default PromoterEditMode