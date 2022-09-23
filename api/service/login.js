import urls from './url.js'
export function login(code,callback) {
	uni.request({
		url: urls.login,
		method:'POST',
		data: code,
		success: (res) => {
			console.log(res)
			callback & callback(res)
			console.log("现在有没有token",uni.getStorageSync('token'))
			getUser((res)=>{
				console.log('getUser的callback里面的res',res)
				console.log('返回的手机号', res?.data?.data?.phoneNumber)
				// state==2是认证失败
				if(!uni.getStorageSync('phoneNumber') && !res?.data?.data?.phoneNumber || res?.data?.data?.state == 2){
					uni.showModal({
						title: '提示',
						content: '为了确保您的正常使用，请前往绑定手机号。',
						showCancel:false,
						complete: () => {
							console.log("showModalSuccess")
							uni.navigateTo({
								url:'/pages/authentication/authentication'
							})
						}
					})
					console.log("未检测到手机号")
				}
			})
		},
		fail: (err) => {
			console.log(err)
			wx.showToast({
				title: err?.errMsg,
				icon: 'none',
				duration: 3000
			})
		},
		complete: () => {
			uni.hideLoading()
		}
	})
}

export function getUser(callback){
	uni.request({
		url:urls.getUser,
		method:'GET',
		header:{
			Authorization: uni.getStorageSync('token'),
		},
		success: (res) => {
			console.log("getUser",res)
			callback & callback(res)
		},
		fail: (err) => {
			console.log("getUser",err)
		}
	})
}

export function updateUser(data,callback){
	uni.request({
		url:urls.updateUser,
		method:'POST',
		header:{
			Authorization: uni.getStorageSync('token'),
		},
		data:data,
		success: (res) => {
			console.log("updateUser",res)
			callback & callback(res)
		},
		fail: (err) => {
			console.log("updateUser",err)
		}
	})
}

export function getUserList(phoneNumber,callback){
	uni.request({
		url:urls.getUserList,
		method:'GET',
		data:{
			phoneNumber:phoneNumber,
		},
		header:{
			Authorization: uni.getStorageSync('token'),
		},
		success: (res) => {
			console.log("getUserList",res)
			callback & callback(res)
		},
		fail: (err) => {
			console.log("getUserList",err)
		}
	})
}