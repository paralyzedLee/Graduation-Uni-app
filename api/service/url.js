import config from 'utils/config.js'
const baseUrl = config.baseUrl
export default{
	// login
	login: baseUrl+'app/login',
	getUser: baseUrl + 'app/getUser',
	updateUser: baseUrl + 'app/updateUser',
	getUserList: baseUrl + 'app/getUserList',
	// lock
	lockApply: baseUrl + 'app/lockApply',
	lockOwn: baseUrl + 'app/lockOwn',
	getLockList: baseUrl + 'app/getLockList',
	open: baseUrl + 'app/open',
	// house
	getBuilding: baseUrl + 'app/getBuilding',
	getFloor: baseUrl + 'app/getFloor',
	getRoom: baseUrl + 'app/getRoom',
	getHouseByLock: baseUrl + 'app/getHouseByLock',
	
}