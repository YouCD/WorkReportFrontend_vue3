import axios from "axios";
// 创建实例
const service=axios.create({
    baseURL:"https://work.youcd.online/",
    timeout:5000,
    headers:{
        "Content-Type":"application/json;charset-utf8"
    }
})

// 请求拦截
service.interceptors.request.use((config)=>{
    // 初始化 headers
    config.headers=config.headers||{}
    if (localStorage.getItem("jwt")){
        config.headers.jwt=localStorage.getItem("jwt")||""
    }
    return config
})

//响应拦截
service.interceptors.response.use((res)=>{
    const code:number=res.data.code
    if (code !==200){
        return Promise.reject(res.data)
    }
    return res.data

},(error)=>{
    console.log(error)
})


export default service