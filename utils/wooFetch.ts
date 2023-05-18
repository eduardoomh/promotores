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

//const FRONT_URL = "https://promotores.vercel.app"
const FRONT_URL = "http://localhost:3000"

const getWooKeys = async () => {
    try {
        const metadata = await axios.get(FRONT_URL + '/api/metadata')

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
        const finalCoupons = coupons.map((el: any) => {
            return el.code
        })
        const noDuplicateCoupons = finalCoupons.filter((item: any, index: any) => {
            return finalCoupons.indexOf(item) === index;
        })

        return {
            success: true,
            response: noDuplicateCoupons

        }

    } catch (error) {
        console.log(error)
        return {
            success: false,
            response: []

        }
    }
}

export const wooGetSpecificCoupons = async (name: string) => {
    try {
        const { success, WooApi }: GetWooKeysI = await getWooKeys()

        if (!success) {
            return {
                success: false,
                response: []

            }
        }

        const params = {
            search: name
        };

        const { data: coupons } = await WooApi.get(`coupons`, params)
        let finalCoupons: any[] = []
        let allProductIds: any[] = []
        for(let coupon of coupons){
            allProductIds = [
                ...allProductIds,
                ...coupon.product_ids
            ]
        }

        if (coupons.length > 0) {
            const productParams = {
                //include: [4317, 4767, 5180, 4212]
                include: allProductIds
            };

            const { data } = await WooApi.get(`products`, productParams)
            console.log(data, "los prkductos")

            for(let coupon of coupons){
                let filterProducts = data.filter((el: any) => coupon.product_ids.includes(el.id))
                coupon.chamosa_products = filterProducts
                finalCoupons.push(coupon)
            }
        }

        console.log(finalCoupons, "results")

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

