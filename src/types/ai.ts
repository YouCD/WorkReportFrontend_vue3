//  添加 日志
import { Urls } from '@/request/url'
import { http, IResponse } from '@/request'
export interface IAiAddContent {
  content: string
}

export const AiAddContent = async (data: IAiAddContent) =>
  await http.Post<IResponse<any>>(Urls.aiAddContent, data)
export const AiSendEmail = async (data: IAiAddContent) =>
  await http.Post<IResponse<any>>(Urls.sendEmail, data)
export const AiWorkLogFromWeek = async () =>
  await http.Get<IResponse<any>>(Urls.aiWorkLogFromWeek)
