//Axios response Type
import service from "./index";

export interface AxiosRespType<P extends {}> {
    code: number,
    msg: string,
    data: P,
    flag:boolean,
}
//  Get 请求
export function GET<T extends {}>(url: string, params: any) {
    return  service.get(url, {
        params: params,
    }).then(res => <AxiosRespType<T>><unknown>res)
}

//  POST 请求
export function POST<T extends {}>(url: string, data: any) {
    return  service.post(url, data).then(res => <AxiosRespType<T>><unknown>res)
}
//  DELETE 请求
export function DELETE<T extends {}>(url: string, data: any) {
    return  service.delete(url, data).then(res => <AxiosRespType<T>><unknown>res)
}

//  PUT 请求
export function PUT<T extends {}>(url: string, data: any) {
    return  service.put(url, data).then(res => <AxiosRespType<T>><unknown>res)
}

