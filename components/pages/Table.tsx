import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from 'antd/es/table';
import { FC, useEffect } from "react";
import { PromoterDataI } from "../../interfaces/promoter.interfaces";
import CardContainer from "../containers/CardContainer";
import {
    EyeOutlined
} from '@ant-design/icons'
import { UserDataI } from "../../interfaces/user.interfaces";
import moment from "moment";

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string;
}

interface DataType2 {
    key: string;
    promoter: PromoterDataI;
    code: string;
    discount: number;
    commission: number;
}

interface BalanceI {
    amount: number;
    before: number;
    after: number;
}


const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const commissionsColumns: ColumnsType<DataType2> = [
    {
        title: 'Promotor',
        dataIndex: 'promoter',
        key: 'promoter',
        render: (promoter: PromoterDataI) => (
            <>
                <p>{promoter?.name}</p>
                <p>{promoter?.last_name}</p>
            </>

        ),
    },
    {
        title: 'Código promocional',
        key: 'code',
        dataIndex: 'code',
        render: text => <Tag color='geekblue'>
            {text?.toUpperCase()}
        </Tag>
    },
    {
        title: 'Descuento',
        dataIndex: 'discount',
        key: 'discount',
    },
    {
        title: 'Comisión',
        dataIndex: 'commission',
        key: 'commission',
    },
];

const movementsColumns: ColumnsType<DataType2> = [
    {
        title: 'Pedido',
        dataIndex: 'order_number',
        key: 'order_number',
    },
    {
        title: 'Promotor',
        dataIndex: 'promoter',
        key: 'promoter',
        render: (promoter: PromoterDataI) => (
            <>
                <p>{promoter?.name}</p>
                <p>{promoter?.last_name}</p>
            </>

        ),
    },
    {
        title: 'Código promocional',
        key: 'code',
        dataIndex: 'code',
        render: text => <Tag color='geekblue'>
            {text?.toUpperCase()}
        </Tag>
    },
    {
        title: 'Descuento',
        dataIndex: 'discount',
        key: 'discount',
    },
    {
        title: 'Comisión',
        dataIndex: 'commission',
        key: 'commission',
    },
    {
        title: 'Pagado',
        dataIndex: 'balance',
        key: 'balance',
        render: (balance: BalanceI) => (
            <>
                <p>{balance.amount}</p>
            </>

        ),
    },
    {
        title: 'Saldo Anterior',
        dataIndex: 'balance',
        key: 'balance',
        render: (balance: BalanceI) => (
            <>
                <p>{balance.before}</p>
            </>

        ),
    },
    {
        title: 'Saldo después',
        dataIndex: 'balance',
        key: 'balance',
        render: (balance: BalanceI) => (
            <>
                <p>{balance.after}</p>
            </>

        ),
    },
];


const getPromoterColumns = (changeCurrentPromoter: any) => {
    const promotersColumns: ColumnsType<DataType2> = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Apellidos',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Correo',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Detalles',
            render: (data: PromoterDataI) =>
                <Button
                    onClick={() => changeCurrentPromoter(data)}
                    style={{ display: 'flex', alignItems: 'center' }}
                    icon={<EyeOutlined />}
                    type="primary"
                    ghost
                >
                    detalles
                </Button>
        },
    ];

    return promotersColumns

}

const getUserColumns = (changeCurrentPromoter: any) => {
    const usersColumns: ColumnsType<DataType2> = [
        {
            title: 'Correo',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Rol',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Registro',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (data: UserDataI) =>{
                return moment(data?.created_at).format("DD-MM-YYYY")
            }
        },
        {
            title: 'Detalles',
            render: (data: PromoterDataI) =>
                <Button
                    onClick={() => changeCurrentPromoter(data)}
                    style={{ display: 'flex', alignItems: 'center' }}
                    icon={<EyeOutlined />}
                    type="primary"
                    ghost
                >
                    detalles
                </Button>
        },
    ];

    return usersColumns

}

type TypeTableI = 'COMMISSIONS' | 'ORDERS' | 'PROMOTERS' | 'MOVEMENTS' | 'USERS';

interface props {
    type: TypeTableI;
    data: any[];
    loading: boolean;
    size?: number;
    assignNewPromoter?: any;
}

const CustomTable: FC<props> = ({ type, data, loading, size = 5, assignNewPromoter }) => {

    const getColumnsByTable = (type: TypeTableI) => {
        switch (type) {
            case 'COMMISSIONS':
                return commissionsColumns
            case 'ORDERS':
                return commissionsColumns
            case 'PROMOTERS':
                return getPromoterColumns(assignNewPromoter)
            case 'MOVEMENTS':
                return movementsColumns
            case 'USERS':
                return getUserColumns(assignNewPromoter)
            default:
                return commissionsColumns
        }
    }

    useEffect(() => {
        console.log(data, "hiozop refertch")
    }, [data])

    return (
        <CardContainer cardStyle={{
            minHeight: '27rem'
        }}>
            <Table
                columns={getColumnsByTable(type)}
                dataSource={data}
                loading={loading}
                size='middle'
                pagination={{ pageSize: size }}
            />
        </CardContainer>

    )
}

export default CustomTable