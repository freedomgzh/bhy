import http from './interface'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const test = (data) => {
	/* http.config.baseUrl = "http://localhost:8080/api/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log('个性化response....')
		//判断返回状态 执行相应操作
		return response;
	}
    return http.request({
		baseUrl: 'http://api.baohaoyou88.com/Home/',
        url: 'http://api.baohaoyou88.com/Home/',
		dataType: 'text',
        data,
    })
}
export const picUrl = 'https://api.baohaoyou88.com/ashx'
export const login = (data) => {
    return http.request({
        url: 'Login_work',
        method: 'POST', 
        data,
		
    })
}

export const getOrderList = (data) => {
    return http.request({
        url:'GetOrderList_work',
		method: 'POST', 
        data,
		// handle:true
    })
}
export const getMessageList = (data) => {
    return http.request({
        url:'GetMessageList',
		method: 'POST', 
        data,
		// handle:true
    })
}
export const FeedBack = (data) => {
    return http.request({
        url:'FeedBack',
		method: 'POST', 
        data,
		// handle:true
    })
}
export const AddQianfeng = (data) => {
    return http.request({
        url:'AddQianfeng',
		method: 'POST', 
        data,
		// handle:true
    })
}
export const GetOpenId_work = (data) => {
    return http.request({
        url:'GetOpenId_work',
		method: 'POST', 
        data,
		// handle:true
    })
}
export const WeChatPay_work = (data) => {
    return http.request({
        url:'WeChatPay_work',
		method: 'POST', 
        data,
		// handle:true
    })
}

export const CompleteOrder = (data) => {
    return http.request({
        url:'CompleteOrder',
		method: 'POST', 
        data,
		// handle:true
    })
}
export const GetQianFengList = (data) => {
    return http.request({
        url:'GetQianFengList',
		method: 'POST', 
        data,
		// handle:true
    })
}
export const GetVideoUrl = (data) => {
    return http.request({
        url:'GetVideoUrl',
		method: 'POST', 
        data,
		// handle:true
    })
}

// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
login,
getOrderList,
getMessageList,
picUrl,
FeedBack,
AddQianfeng,
GetOpenId_work,
WeChatPay_work,
CompleteOrder,
GetQianFengList,
GetVideoUrl
}