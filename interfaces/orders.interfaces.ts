interface ProducItems{
    id: string;
    name?: string;
    total_price?: string;
    quantity?: number;
    variation: string

}
export interface StoreOrder {
    id: string;
    order_number: string;
    customer_details: {
        name:{
            first_name: string;
            last_name: string;
            full_name: string;
        }
        phone: string;
        email: string;
        company: string;
    }
    shipping_address: {
        address: string;
        neighborhood: string;
        city: string;
        province: {
            code: string;
            name: string;
        }
        country:{
            code: string;
            name: string;
        }
        zip_code: string;
        reference: string;
    }
    fulfillment_info: {
        status: string;
    }
    payment_info: {
        price:{
            shipping_price: string;
            subtotal_price: string;
            total_price: string;
        },
        status: string;
        currency: string;
    }
    product_items: ProducItems[];
    created_at: string;
    metadata?: {
        color?: string;
    }
}