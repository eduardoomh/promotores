import { Col, Divider, Tag, Typography } from "antd";
import { FC } from "react";

interface props {
    label: string;
    text?: string | undefined;
    tagList?: string[] | undefined;
}
const ViewItem: FC<props> = ({ text, label, tagList = undefined }) => {
    return (
        <Col span={24}>
            <Typography.Text strong >
                {label}
            </Typography.Text>
            <Typography>
                {
                    tagList
                        ? tagList.map(el => (
                            <Tag key={el} style={{marginTop: '8px'}}>{el}</Tag>
                        )) : text
                }
            </Typography>
            <Divider />
        </Col>
    )
}

export default ViewItem