import { PromoterDataI } from "./promoter.interfaces";

export interface NewMovementDataI {
    order_number: string;
    promoter: string;
    code: string;
    discount: number;
    commission: number;
    amount: number;
}

export interface MovementDataI{
    _id: string;
    order_number: string;
    code: string;
    discount: number;
    commission: number;
    amount: number;
    promoter: PromoterDataI;
    balance: {
        amount: number;
        before: number;
        after: number;
    }
    created_at: number;
}

export interface AddMovementDataI {
    movement: NewMovementDataI;
}

