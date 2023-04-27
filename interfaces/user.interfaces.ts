export interface NewUserDataI {
    name: string;
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
    name?: string;
    email?: string;
    password?: string
    role?: 'promoter'|'admin';
}

export interface AddUserDataI {
    user: NewUserDataI;
}

export interface EditUserDataI {
    user: ModifyUserDataI;
}

export interface DeleteUserDataI {
    id: string
}

export interface LoginUserI{
    email: string;
    password: string;
}


