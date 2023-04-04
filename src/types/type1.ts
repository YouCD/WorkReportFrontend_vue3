import {http, IResponse} from "@/request";

export interface IType {
    id: number,
    description: string,
    pid: number,
    type: number
}

export interface ITypeList {
    type_list: IType[],
}

export const FetchType1 = async () =>
    await http.Get<IResponse<ITypeList>>('w/workType1');