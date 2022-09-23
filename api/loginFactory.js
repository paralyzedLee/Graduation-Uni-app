import {login} from "./service/login.js"

class loginFactory {
	constructor() {
	}
	login() {
		let _this = this
		uni.showModal({
			title: '提示',
			content: '需要登录后才能操作，是否登录？',
			success: function(res) {
				if (res.confirm) {
					wx.getUserProfile({
						desc: '获取用户信息识别个人身份', 
						success: (res) => {
							// debugger;
							console.log(res)
							uni.setStorageSync('userInfo', res.userInfo)
							uni.showLoading({
								title: '登录中',
								mask: true
							});
							_this.doLogin((res) => {
								uni.hideLoading();
								// debugger;
								console.log("token:" + res?.data?.data?.token)
								wx.setStorageSync('token', res?.data?.data?.token);
								wx.switchTab({
									url: '/pages/index/index'
								});
							}, err => {
								uni.hideLoading();
								wx.showToast({
									title: err,
									icon: 'none',
									duration: 5000
								})
							});
						},
						complete: () => {
						}
					})
				} else if (res.cancel) {
					console.log('用户点击取消登录');
				}
			}
		})
	}
	doLogin(callback = () => {}, fail = () => {}) {
		let that = this;
		wx.login({
			success: function(loginRes) {
				if (loginRes.code) {
					//请求服务后端登录
					console.log("loginRes",loginRes)
					login(loginRes.code,callback)
				} else {
					// 获取 code 失败
					console.log('调用wx.login获取code失败');
				}
			},
			fail: function(error) {
				// 调用 wx.login 接口失败
				console.log(error);
				fail && fail(error);
			}
		});
	}
}
module.exports = new loginFactory();
