
interface PromoterCodesI {
    promoter: string;
    code: string;
}

export interface StoreKeys {
    client_id: string;
    client_secret: string;
    store_url: string;
}

export interface NewKeysDataI {
    store_keys: StoreKeys
}

export interface MetadataDataI extends NewKeysDataI {
    _id: string;
    promoter_codes: PromoterCodesI[];
}

export interface ModifyKeysDataI {
    client_id?: string;
    client_secret?: string;
    store_url?: string;
}

export interface AddMetaKeysDataI {
    store_keys: StoreKeys;
}

export interface EditMetaKeysDataI {
    store_keys: ModifyKeysDataI;
}


