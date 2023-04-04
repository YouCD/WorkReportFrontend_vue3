import axios from "axios";
import {message} from "ant-design-vue";
// 创建实例
const service = axios.create({
    baseURL: "https://work.youcd.online/",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json;charset-utf8"
    }
})

// 请求拦截
service.interceptors.request.use((config) => {
    // 初始化 headers
    config.headers = config.headers || {}
    if (localStorage.getItem("jwt")) {
        config.headers.jwt = localStorage.getItem("jwt") || ""
    }
    return config
})

//响应拦截
service.interceptors.response.use((res) => {
    const code: number = res.data.code
    if (code !== 200) {
        message.error(res.data.data.msg)
        return Promise.reject(res)
    }
    message.success(res.data.msg)
    return res

}, (error) => {
    message.error(error.response.data.msg);
    console.log(error)
})


export interface IResponse<d extends {}> {
    code: number;
    msg: string;
    data: d;
    flag: boolean;
}

interface IHttp {
    Post<T>(url: string, data: any | unknown): Promise<T>;

    Get<T>(url: string, data?: any | unknown): Promise<T>;
}

export const http: IHttp = {
    Post(url, data) {
        return new Promise((resolve, reject) => {
            // axiso 自带 get 和 post 方法
            service.post(url, data).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    Get(url, data) {
        return new Promise((resolve, reject) => {
            service.get(url, {
                params: data
            }).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}
