
export interface NewMovementDataI {
    order_number: string;
    promoter: string;
    code: string;
    discount: number;
    commission: number;
    amount: number;
}

export interface MovementDataI extends NewMovementDataI {
    _id: string;
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

