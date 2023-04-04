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


export interface LogContent {
    type1: number,
    type2: number,
    content: string,
    date: number
}

//  添加 日志
// export const AddLog=(data:LoginRequestData)=>POST('/w/workLog',data )

//  获取日志
// export const FetchLog=(data:PageRequestData)=>GET('/w/workLog',data )
export async function FetchLog(data: IPageRequestData) {
    const res = await http.Get<IResponse<IWorkContentRespList>>('/w/workLog', data);
    return res
}

//  修改日志
// export const ModifyLog=(data:LoginRequestData)=>PUT('/w/workLog',data )
