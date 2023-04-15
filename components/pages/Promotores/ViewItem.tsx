import { Col, Divider, Typography } from "antd";
import { FC } from "react";

interface props {
    label: string;
    text: string | undefined
}
const ViewItem: FC<props> = ({ text, label }) => {
    return (
        <Col span={24}>
            <Typography.Text strong >
                {label}
            </Typography.Text>
            <Typography>
                {text}
            </Typography>
            <Divider />
        </Col>
    )
}

export default ViewItem