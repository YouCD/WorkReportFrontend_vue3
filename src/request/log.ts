import {GET, POST, PUT} from "./request";
import {LoginRequestData} from "../types/login";
import {PageRequestData} from "../types/log";

//  添加 日志
export const AddLog=(data:LoginRequestData)=>POST('/w/workLog',data )

//  获取日志
export const FetchLog=(data:PageRequestData)=>GET('/w/workLog',data )

//  修改日志
export const ModifyLog=(data:LoginRequestData)=>PUT('/w/workLog',data )
