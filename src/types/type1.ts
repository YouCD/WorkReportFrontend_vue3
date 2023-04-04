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

export async function FetchType1() {
    const res = await http.Get<IResponse<ITypeList>>('w/workType1');
    return res
}
