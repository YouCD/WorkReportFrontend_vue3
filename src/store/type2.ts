import {defineStore} from 'pinia'
import {ref} from "vue";
import {IType} from "@/types/type1";
import {FetchType2, IPid} from "@/types/type2";


export const type2Store = defineStore('type2', () => {
    let type2Data = ref<IType []>([])
    const getType2List = async (data: IPid) => {
        let res = await FetchType2(data)
        type2Data.value = res.data.type_list
    }
    return {
        type2Data,
        getType2List
    }
})

