import {Dayjs} from "dayjs";
import moment from "moment/moment";

export function Djs2UnixTime(value:Dayjs){
   return  moment(value.format("YYYY-MM-DD")).unix()
}