import urls from './url.js'

export function lockApply(data,callback){
	uni.request({
		url:urls.lockApply,
		method:'POST',
		header:{
			Authorization: uni.getStorageSync('token'),
		},
		data:data,
		success: (res) => {
			console.log("lockApply",res)
			callback & callback(res)
		},
		fail: (err) => {
			console.log("lockApply",err)
		}
	})
}

export function lockOwn(lockId,callback){
	uni.request({
		url:urls.lockOwn,
		method:'GET',
		header:{
			Authorization: uni.getStorageSync('token'),
		},
		data:{
			lockId:lockId,
		},
		success: (res) => {
			console.log("lockOwn",res)
			callback & callback(res)
		},
		fail: (err) => {
			console.log("lockOwn",err)
		}
	})
}

export function getLockList(callback){
	uni.request({
		url:urls.getLockList,
		method:'GET',
		header:{
			Authorization: uni.getStorageSync('token'),
		},
		success: (res) => {
			console.log("getLockList",res)
			callback & callback(res)
		},
		fail: (err) => {
			console.log("getLockList",err)
		}
	})
}

export function open(data,callback){
	uni.request({
		url:urls.open,
		method:'GET',
		header:{
			Authorization: uni.getStorageSync('token'),
		},
		data:{
			lockId:lockId,
		},
		success: (res) => {
			console.log("open",res)
			callback & callback(res)
		},
		fail: (err) => {
			console.log("open",err)
		}
	})
}
