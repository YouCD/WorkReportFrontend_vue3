export interface LoginDataInt{
    username:string,
    password:string
}

export class  LoginData{
    loginFrom:LoginDataInt={
        username:"",
        password:""
    }
}