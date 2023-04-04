import {http, IResponse} from "@/request";
import {IType} from "@/types/type1";



export interface ITypeList {
    type_list: IType[],
}

export interface IPid {
    pid: number,
}





export async function FetchType2(data:IPid) {
    const res = await http.Get<IResponse<ITypeList>>('w/workType2',data);
    return res
}
