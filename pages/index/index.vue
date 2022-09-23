<template>
	<view class="container">
		<!-- 广告图片 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
						:duration="duration">
						<swiper-item v-for="(item , index) in swiperItem" :key="index" class="swiper-item">
							<image :src="item" style="margin:0 auto;width: 100%;"></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<!-- 开锁按钮 -->
		<view class="key">
			<view v-for="(item,index) in keyItem" :key="index" class="keyItem"
				@click="goToWithItem('/pages/keyInfo/keyInfo',item)" > 
				<image src="../../static/icon/lock.png" class="keyImage"></image>
				<text class="keyWord1">{{item.room}}</text>
				<text class="keyWord2">{{returnState(item.state)}}</text>
			</view>
		</view>
	</view>
	
</template>

<script>
	let deviceId = ''
	const loginFactory = require('api/loginFactory.js')
	import {hexMD5} from './pwdmgr.js';
	import API from "../../api/API";
	import {
		getLockList,
		open
	} from '../../api/service/lock.js'
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				swiperItem: ["../../static/slide1.jpeg", "../../static/slide2.jpeg"],
				keyItem: [{
					building: '楼幢号',
					floor: '层数',
					room: '203',
					lockId: 'BL123456',
					isCommon: '1',
					state: 'a1'
				}],
				code:'',
			}
		},
		components:{
		},
		methods: {
			setData: function(obj) {
				let that = this;
				let keys = [];
				let val, data;
				Object.keys(obj).forEach(function(key) {
					keys = key.split('.');
					val = obj[key];
					data = that.$data;
					keys.forEach(function(key2, index) {
						if (index + 1 == keys.length) {
							that.$set(data, key2, val);
						} else {
							if (!data[key2]) {
								that.$set(data, key2, {});
							}
						}
						data = data[key2];
					})
				});
			},
			getKeyList() {
				getLockList(res => {
					const keyList = res?.data?.data
					console.log(keyList)
					const list = []
					for(let key of keyList){
						const item = {
							building: key.buildingName,
							floor: key.floorName,
							room: key.roomName,
							blueToothId:key.blueToothId,
							lockId: key.id,
							isCommon: '1',
							state: 'a0',
							lockData: key.lockData,
						}
						console.log(item)
						list.push(JSON.parse(JSON.stringify(item)))
					}
					this.keyItem = list
				})
			},
			lockOpen(item) {
				open(item.lockId, res => {
					const canOpen = res?.data?.data
					if (canOpen) {
						this.toOpenDoor(item)
					} else {
						uni.showModal({
							content: "您没有开锁权限！",
							showCancel: false,
						})
					}
				})
			},
			toOpenDoor(item) {
				wx.showLoading({
					title: "正在开启智能锁",
				})
				const start = Date.now();
				// 调用开锁接口
				const lockData = item.lockData ? item.lockData : uni.getStorageSync('lockData')
				this.state = lockData
				plugin.controlLock(plugin.ControlAction.OPEN, lockData,
					res => {
						if (res.errorCode === 10003) {
							console.log("获取版本信息时设备连接已断开", res)
						}
					}, null, deviceId).then(res => {
					wx.hideLoading({});
					console.log(res)
					this.res = res
					if (!!res.deviceId) deviceId = res.deviceId;
					if (res.errorCode === 0) {
						this.setData({
							state: `已开锁--操作时间:${Date.now() - start}ms.`
						})
					} else {
						this.setData({
							state: `开锁失败: ${res.errorMsg}`
						})
					}
				})
			},
			returnState(state) {
				switch (state) {
					case 'a0':
						return "空闲"
						break;
					case 'a1':
						return "打扫中"
						break;
					case 'b0':
						return "维修"
						break;
				}
			},
		},
		watch: {
			scrollable(newVal, oldVal) {
				this.animationPlayState = newVal ? 'running' : 'paused'
			}
		},
		onLoad() {
			// 未登录时的登录
			if (!uni.getStorageSync('token')) {
				loginFactory.login()
			}
			if (!uni.getStorageSync('access_token')) {
				API.login({
					"username": this.data.username,
					"password": hexMD5(this.data.password)
				}).then(res => {
					console.log(res)
					if (!!res) {
						uni.setStorageSync('access_token', res.access_token);
						uni.setStorageSync('psd', hexMD5(this.data.password));
						uni.setStorageSync('uid', res.uid);
					}
				})
			}
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {uni.stopPullDownRefresh();}, 1000);
			this.getKeyList()
		},
		onShow() {},
	}
</script>

<style>
	.container {
		background-color: #c0d8f1;
		padding: 1rpx;
		height: 100%;
	}

	.swiper {
		height: 300rpx;
	}

	.swiper-item {
		width: 100%;
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}

	.key {
		background-color: white;
		width: 90%;
		margin: 20rpx auto 0;
		position: relative;
		min-height: 100rpx;
		border-radius: 1em 1em 1em 1em;
		display: flex;
		
	}

	.keyItem {
		width: 50%;
		height: 500rpx;
		position: relative;
		border-bottom: #FFF0F5 1rpx solid;
	}

	.keyImage {
		position: absolute;
		width: 180rpx;
		height: 180rpx;
		left: 85%;
		margin-left: -40rpx;
		top: 15%;
	}

	.keyWord1 {
		position: relative;
		left: 90%;
		transform: translateX(-50%);
		top: calc(5% + 220rpx);
		font-size: 40rpx;
	}

	.keyWord2 {
		position: relative;
		left: 60%;
		transform: translateX(-50%);
		top: calc(5% + 270rpx);
		font-size: 40rpx;
		color: #9035ff;
	}
	
</style>
