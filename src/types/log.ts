import {http, IResponse} from "@/request";

export interface IPageRequestData {
    pageIndex: number,
    pageSize: number
}

export interface IWorkContent {
    id: number,
    date: number,
    type1: string,
    type1_id: number,
    type2: string,
    type2_id: number,
    content: string
}

export interface IWorkContentRespList {
    work_content_resp_list: IWorkContent [],
    sum: number
}





export interface IAddLogData {
    type1: number,
    type2: number,
    content: string,
    date: number
}

//  添加 日志  todo 后端的返回有bug
export async function AddLog(data: IAddLogData) {
    const res = await http.Post<IResponse<any>>('/w/workLog', data);
    return res
}

//  获取日志
export async function FetchLog(data: IPageRequestData) {
    const res = await http.Get<IResponse<IWorkContentRespList>>('/w/workLog', data);
    return res
}

//  修改日志
// export const ModifyLog=(data:LoginRequestData)=>PUT('/w/workLog',data )


