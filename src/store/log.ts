import {defineStore} from 'pinia'
import {ref} from "vue";
import {FetchLog, IContentData, IWorkContent, SearchLog} from "@/types/log";
import {IPageRequestData} from "@/types/commont";


// 第一个参数是应用程序中 store 的唯一 id
export const logStore = defineStore('log', () => {

    let LogData = ref<IWorkContent []>([])
    let sum = 0
    const getLogData = async (data: IPageRequestData) => {
        let res = await FetchLog(data)
        sum = res.data.sum
        LogData.value = res.data.work_content_resp_list
    }

     const searchLog = async (data: IContentData) => {
        if (data.content==""){
            return
        }
        let res = await SearchLog(data)
        sum = res.data.sum
        LogData.value = res.data.work_content_resp_list
    }




    return {
        LogData,
        sum,
        getLogData,
        searchLog
    }
})


// export const logStore = defineStore('log', {
//     state: () => ({
//         LogData: {} as IWorkContentRespList,
//     }),
//     getters: {
//         getLogData(state) {
//             // 自动完成! ✨
//             return state.LogData
//         },
//
//     },
//     actions: {
//         // 任何数量的参数，返回一个 Promise 或者不返回
//         async FetchLog(data: IPageRequestData) {
//
//             const result = await LoginHandler(data)
//
//
//         },
//     },
// })