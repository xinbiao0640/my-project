//
export interface UserInfo {
    userId: number,
    avatar: string,
    username: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: string,
    
}

export interface LoginResponse {
    code: number;
    data: {
        token: string;
    }
}

export interface LoginData {
    username: string;
    password: string;
}

export interface userResponseData {
    code: number;
    data: {
        checkUser: UserInfo;
    }
}