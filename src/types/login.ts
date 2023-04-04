import {http, IResponse} from "@/request";


export interface LoginRequestData {
    username: string,
    password: string
}

export interface LoginResponseData {
    token: string,
    uid: string
}


//  登入
export const LoginHandler = async (data: LoginRequestData) =>
    await http.Post<IResponse<LoginResponseData>>('login', data);
