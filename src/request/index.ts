import axios from "axios";
import {message} from "ant-design-vue";
export const BaseUrl="http://127.0.0.1:8080/"
import router from "@/router"

// 创建实例
const service = axios.create({
    // baseURL: "https://work.youcd.online/",
    baseURL:BaseUrl,
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
    if (res.headers["content-type"]=="application/octet-stream"){
        return Promise.reject(res)
    }
    const code: number = res.data.code
    if (code !== 200) {
        message.error(res.data.data.msg)
        return Promise.reject(res)
    }
    return res

},  (error) => {



    message.error(error.response.data.msg);
    switch (error.response.status) {
        case 401:console.log("sssssssssssssssssssssss",error.response.status)

             router.push("/login")
    }



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

    Put<T>(url: string, data?: any | unknown): Promise<T>;

    Delete<T>(url: string, data?: any | unknown): Promise<T>;

    // GetFile<T>(url: string, data?: any | unknown): Promise<T>;

}

export const http: IHttp = {
    Post(url, data) {
        return new Promise((resolve, reject) => {
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
    },
    Put(url, data) {
        return new Promise((resolve, reject) => {
            service.put(url, data).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    Delete(url, data) {
        return new Promise((resolve, reject) => {
            service.delete(url, {
                params: data
            }).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //
    // GetFile(url, data) {
    //     return new Promise((resolve, reject) => {
    //         service.get(url, {
    //             params: data,
    //             responseType: 'blob'
    //         }).then(res => {
    //             resolve(res.data)
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // },


}
