export interface NewUserDataI {
    email: string;
    password: string
    role: 'promoter'|'admin';
}

export interface UserDataI extends NewUserDataI {
    _id: string;
    created_at: number;
    updated_at: number;
}

export interface ModifyUserDataI {
    _id?: string;
    email?: string;
    password?: string
    role?: 'promoter'|'admin';
}

export interface AddUserDataI {
    user: NewUserDataI;
}

export interface EditUserDataI {
    id: string;
    user: ModifyUserDataI;
}

export interface DeleteUserDataI {
    id: string
}


