import service from "../request";
import {GET} from "../request/request";

export interface LoginRequestData {
    username: string,
    password: string
}



export interface LoginResponseData {
    token: string,
    uid: string
}



