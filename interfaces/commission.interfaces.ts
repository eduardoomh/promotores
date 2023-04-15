import { PromoterDataI } from "./promoter.interfaces";

export interface NewCommissionDataI {
    promoter: string;
    code: string;
    discount: number;
    commission: number;
}

export interface CommissionDataI {
    _id: string;
    promoter: PromoterDataI;
    code: string;
    discount: number;
    commission: number;
    created_at: number;
    updated_at: number;
}

export interface AddCommissionDataI {
    commission: NewCommissionDataI;
}

