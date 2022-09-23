
const whiteList = [
    '/pages/index/index',
	'/pages/my/my',
	'/pages/authentication/authentication',
	'/pages/setting/setting',
	'/pages/meal/meal',
]
 
function hasPermission (url) {
    // 在白名单中或有token，直接跳转
    if(whiteList.indexOf(url) !== -1 || uni.getStorageSync('token')) {
        return true
    }
    return false
}

export const routeIntercept = ()=>{
	const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
	list.forEach(item=>{
		uni.addInterceptor(item, {
		    // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
		    invoke (e) {
				const url = e.url.split('?')[0]
		        if(!hasPermission(url)){
		            uni.reLaunch({
		                url: '/pages/index/index'
		            })
		            return false
		        }
		        return true
		    },
		    success (e) {
		    }
		})
	})
}
