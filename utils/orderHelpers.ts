import { StoreOrder } from "../interfaces/orders.interfaces"

export const formattedWooOrders = (orders: any) =>{
    return orders.map((order: any): StoreOrder => {
        const {
            id,
            date_created,
            status,
            total,
            line_items,
            shipping_total,
            [order.shipping !== undefined ? 'shipping' : 'billing']: {
                first_name,
                last_name,
                address_1,
                address_2,
                city,
                state,
                country,
                postcode,
            },
            billing: {
                phone,
                email
            }
        } = order
        return {
            id: `${id}`,
            order_number: `${id}`,
            customer_details: {
                name: {
                    first_name: first_name,
                    last_name: last_name,
                    full_name: `${first_name} ${last_name}`,
                },
                phone,
                email,
                company: ''
            },
            shipping_address: {
                address: address_1,
                neighborhood: address_2,
                city,
                province: {
                    code: state,
                    name: state
                },
                country: {
                    code: country,
                    name: country
                },
                zip_code: postcode,
                reference: ''
            },
            fulfillment_info: {
                status,
            },
            payment_info: {
                price: {
                    shipping_price: shipping_total,
                    subtotal_price: `${parseFloat(total) - parseFloat(shipping_total)}`,
                    total_price: total
                },
                status: "N/A",
                currency: 'MXN'

            },
            product_items: line_items.map((el: any) => {
                return {
                    id: el.product_id,
                    name: el.name,
                    total_price: el.total,
                    quantity: el.quantity,
                    variation: `${el.variation_id}`
                }

            }),
            created_at: date_created,
        }
    })
}
    
