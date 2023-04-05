import {http, IResponse} from "@/request";
import {IType} from "@/types/type1";
import {IPid} from "@/types/commont";


export interface ITypeList {
    type_list: IType[],
}


// export async function FetchType2(data:IPid) {
//     const res = await http.Get<IResponse<ITypeList>>('w/workType2',data);
//     return res
// }
export const FetchType2 = async (data: IPid) =>
    await http.Get<IResponse<ITypeList>>('w/workType2', data);
