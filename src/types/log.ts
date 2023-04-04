import {http, IResponse} from "@/request";

export interface IPageRequestData {
    pageIndex: number,
    pageSize: number
}

export interface IWorkContent {
    id?: number,
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
    id?: number,
    type1: number,
    type2: number,
    content: string,
    date: number
}

//  添加 日志  todo 后端的返回有bug

export const AddLog = async (data: IAddLogData) =>
    await http.Post<IResponse<any>>('/w/workLog', data);

//  获取日志
export const FetchLog = async (data: IPageRequestData) =>
    await http.Get<IResponse<IWorkContentRespList>>('/w/workLog', data);


//  修改日志
export const ModifyLog = async (data: IAddLogData) =>
    await http.Put<IResponse<any>>('/w/workLog', data);



