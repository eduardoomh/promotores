import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"
import axios from "axios"
import { formattedWooOrders } from "./orderHelpers";

type GetWooKeysI = {
    success: boolean;
    WooApi?: any
}

export interface WooGetDataI {
    success: boolean;
    response: any;
}

const getWooKeys = async () => {
    try {
        const metadata = await axios.get('http://localhost:3000/api/metadata')

        if (!metadata.data) {
            return {
                success: false
            }
        }
        const { data } = metadata
        const { store_keys: { client_id, client_secret, store_url } } = data[0]

        const WooApi = new WooCommerceRestApi({
            url: store_url,
            consumerKey: client_id,
            consumerSecret: client_secret,
            version: "wc/v3",
            queryStringAuth: true

        })

        return {
            success: true,
            WooApi
        }
    } catch (error) {
        console.log(error)

        return {
            success: false
        }

    }
}

export const wooGetOrders = async () => {
    try {
        const { success, WooApi }: GetWooKeysI = await getWooKeys()

        if (!success) {
            return {
                success: false,
                response: []

            }
        }

        const { data: orders } = await WooApi.get("orders", {
            per_page: 50,
            offset: 0,
            page: 1

        })
        const wooOrders = formattedWooOrders(orders)

        return {
            success: true,
            response: wooOrders

        }

    } catch (error) {
        console.log(error)
        return {
            success: false,
            response: []

        }
    }
}

export const wooGetCoupons = async () => {
    try {
        const { success, WooApi }: GetWooKeysI = await getWooKeys()

        if (!success) {
            return {
                success: false,
                response: []

            }
        }

        const { data: coupons } = await WooApi.get("coupons")
        const finalCoupons = coupons.map((el: any) =>{
            return el.code
          })

        return {
            success: true,
            response: finalCoupons

        }

    } catch (error) {
        console.log(error)
        return {
            success: false,
            response: []

        }
    }
}

