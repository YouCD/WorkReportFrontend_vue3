export interface PageRequestData {
    pageIndex: number,
    pageSize: number
}
export interface WorkContent  {
    id: number,
    date: number,
    type1: string,
    type1_id: number,
    type2: string,
    type2_id: number,
    content: string
}

export interface WorkContentRespList {
    work_content_resp_list:  WorkContent [],
    sum: number
}