﻿import { config } from '../config.js'

const tips = {
	1: '出现一个错误!',
	1005: 'appkey 无效',
	3000: '期刊不存在'
}

class HTTP {
  // 传对象 {}
	request({ url, data = {}, method = 'GET' }) {
		return new Promise((resolve, reject) => {
			this._request(url, resolve, reject, data, method)
		})
	}
  /* http 请求类, 当 noRefech 为 true 时，不做未授权重试机制 */
  /* 必填参数在默认参数前 */
	_request(url, resolve, reject, data = {}, method = 'GET') {
		wx.request({
			url: config.api_blink_url + url,
			data: data,
			method: method,
			header: {
				'content-type': 'application/json',
				appkey: config.appkey
			},
			success: res => {
				/*
        判断以2（2xx)开头的状态码为正确
				异常不要返回到回调中，就在 request 中处理，记录日志并 showToast 一个统一的错误即可
        */
				const code = res.statusCode.toString()
				if (code.startsWith('2')) {
					/* params.success 是否为 null, 如果不是则执行后面代码 */
					resolve(res.data)
				} else {
					reject()
					const error_code = res.data.error_code
					this._show_error(error_code)
				}
			},
			/* 没网络时才调用 */
			fail: err => {
				reject()
				this._show_error(1)
			}
		})
	}
	_show_error(error_code) {
		if (!error_code) {
			error_code = 1
		}
		const tip = tips[error_code]
		wx.showToast({
			title: tip ? tip : tips[1],
			icon: 'none',
			duration: 2000
		})
	}
}

export { HTTP }
