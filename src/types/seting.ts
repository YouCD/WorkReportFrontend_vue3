import {http, IResponse} from "@/request";

export interface ITypeData {
    description:string,
    type:number,
    pid:number
}




//  添加 工作类别
export const AddType = async (data: ITypeData) =>
    await http.Post<IResponse<any>>('/w/workType', data);


