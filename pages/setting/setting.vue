<template>
	<view class="container" style="">
		<view class="text1">
			<u--text type="info" text="当前版本:1.0.0"></u--text>
		</view>
		<view class="text2">
			<u--text type="info" text="如有意见请拨打客服电话15325117133反馈"></u--text>
		</view>
		<button type="warn" class="button" @click="exit">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			exit(){
				console.log("点击了exit按钮")
				uni.clearStorageSync()
				try{
					console.log(!uni.getStorageSync('userId'))
				}catch(e){
					console.log(e)
				}
			}
		}
	}
</script>

<style>
.container {
		background-color: #ffffff;
		padding: 1rpx;
		min-height: 100%;
		position: relative;
	}
	.text1{
		text-align: center;
		position: absolute;
		top: 6%;
		left: 50%;
		transform: translateX(-50%);
	}
	.text2{
		text-align: center;
		position: absolute;
		top: 10%;
		left: 50%;
		transform: translateX(-50%);
	}
	.button{
		position: absolute;
		width: 80%;
		bottom: 5%;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
