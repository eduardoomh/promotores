
export interface NewPromoterDataI {
    promoter_codes: string[];
    name: string;
    last_name: string;
    address: string;
    postal_code: string;
    phone: string;
    cell_phone: string;
    email: string;
    rfc: string;
}

export interface PromoterDataI extends NewPromoterDataI {
    _id: string;
    type: 'active' | 'inactive';
    balance?: number;
    created_at: number;
    updated_at: number;
}

export interface ModifyPromoterDataI {
    _id?: string;
    promoter_codes?: string[];
    name?: string;
    last_name?: string;
    address?: string;
    postal_code?: string;
    phone?: string;
    cell_phone?: string;
    rfc?: string;
    balance?: number;
    type?: 'active' | 'inactive';
}

export interface AddPromoterDataI {
    promoter: NewPromoterDataI;
}

export interface EditPromoterDataI {
    id: string;
    promoter: ModifyPromoterDataI;
}

export interface DeletePromoterDataI {
    id: string
}


