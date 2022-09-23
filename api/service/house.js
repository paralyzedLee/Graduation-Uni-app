import urls from './url.js'

export function getBuilding(areaId,callback){
	uni.request({
		url:urls.getBuilding,
		method:'GET',
		data:{
			areaId: areaId
		},
		header:{
			Authorization: uni.getStorageSync('token'),
		},
		success: (res) => {
			console.log("getBuilding",res)
			callback & callback(res)
		},
		fail: (err) => {
			console.log("getBuilding",err)
		}
	})
}


export function getFloor(unitId,callback){
	uni.request({
		url:urls.getFloor,
		method:'GET',
		data:{
			unitId: unitId
		},
		header:{
			Authorization: uni.getStorageSync('token'),
		},
		success: (res) => {
			console.log("getFloor",res)
			callback & callback(res)
		},
		fail: (err) => {
			console.log("getFloor",err)
		}
	})
}

export function getRoom(floorId,callback){
	uni.request({
		url:urls.getRoom,
		method:'GET',
		data:{
			floorId: floorId
		},
		header:{
			Authorization: uni.getStorageSync('token'),
		},
		success: (res) => {
			console.log("getRoom",res)
			callback & callback(res)
		},
		fail: (err) => {
			console.log("getRoom",err)
		}
	})
}

export function getHouseByLock(lockId,callback){
	uni.request({
		url:urls.getHouseByLock,
		method:'GET',
		data:{
			lockId:lockId
		},
		header:{
			Authorization: uni.getStorageSync('token'),
		},
		success: (res) => {
			console.log("getHouseByLock",res)
			callback & callback(res)
		},
		fail: (err) => {
			console.log("getHouseByLock",err)
		}
	})
}
