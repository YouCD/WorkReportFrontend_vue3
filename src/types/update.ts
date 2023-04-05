//  获取 Type1Count

import {http, IResponse} from "@/request";

//  检查更新
export const UpdateCheck = async () =>
    await http.Get<IResponse<any>>('/w/updateCheck',);
