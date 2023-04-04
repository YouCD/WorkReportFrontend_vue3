import {defineStore} from 'pinia'
import {ref} from "vue";
import {FetchType1, IType} from "@/types/type1";


export const type1Store = defineStore('type1', () => {
    let type1Data = ref<IType []>([])
    const getType1List = async () => {
        let res = await FetchType1()
        type1Data.value = res.data.type_list
    }
    return {
        type1Data,
        getType1List
    }
})
