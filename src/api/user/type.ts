//
export interface LoginData {
    username: string;
    password: string;
}

export interface ResponseData {
    code: number;
    message: string;
    ok: boolean;
}

export interface LoginResponse extends ResponseData {
    data: string;
}

export interface UserInfoResponse extends ResponseData {
    data: {
        routes: string[];
        buttons: string[];
        roles: string[];
        name: string;
        avatar: string;
    }
}