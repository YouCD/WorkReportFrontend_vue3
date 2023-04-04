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
export async function LoginHandler(data: LoginRequestData) {
    const res = await http.Post<IResponse<LoginResponseData>>('login', data);
    return res
}
