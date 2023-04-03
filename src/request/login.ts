import {GET, POST} from "./request";
import {LoginRequestData} from "../types/login";

export const Login=(data:LoginRequestData)=>POST('login',data )

