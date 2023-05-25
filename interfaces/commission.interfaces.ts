import { PromoterDataI } from "./promoter.interfaces";

export interface NewCommissionDataI {
    promoter: string;
    code: string;
    coupon: CouponDetailsI;
    discount_type: string;
    discount: number;
    commission: number;
}

export interface CommissionDataI {
    _id: string;
    promoter: PromoterDataI;
    code: string;
    coupon: CouponDetailsI;
    discount_type: string;
    discount: number;
    commission: number;
    created_at: number;
    updated_at: number;
}

export interface AddCommissionDataI {
    commission: NewCommissionDataI;
}

export interface CouponProductsI{
    id: number;
    name: string;
    price: string;
    image: string;
    image_name: string;
    description: string;
}

export interface CouponDetailsI{
    id: number;
    code: string;
    amount: string;
    discount_type: string;
    description: string;
    created_at: string;
    products: CouponProductsI[];
    status: string;
}

