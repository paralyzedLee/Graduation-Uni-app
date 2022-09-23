<template>
	<view class="container">
		<view class="info">
			<view class="logo">
				<u-avatar icon="lock" fontSize="40" bgColor="#4749f4" size="80"></u-avatar>
			</view>
			<view class="address">{{returnAdd()}}</view>
			<view class="lockId">{{key.lockId}}</view>
			<view class="state">{{returnState(key.state)}}</view>
			<view class="wifi">{{returnWifi(key.wifi)}}</view>
		</view>
		<button type="warn" class="button" @click="exit">退房</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				key: {
					building: '仁和苑',
					floor: '2楼',
					room: '203',
					lockId: 'BL123456',
					isCommon: '1',
					state: 'a1',
					wifi: '88888888',
					lockData: uni.getStorageSync('lockData'),
				},
			}
		},
		methods: {
			returnAdd() {
				return this.key.room + ': '  + this.key.building  + this.key
					.floor 
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
			returnWifi(){
				return  'WiFi密码：' + this.key.wifi
			}
			
		},
		// 接受上一个界面的值
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item));
			this.key = item
			console.log('上一个页面传递过来的参数对象', item);
		}
	}
</script>

<style>
	.container {
		padding: 1rpx;
		height: 100%;
		background-color: #e8e8e8;
	}

	.info {
		position: relative;
		height: 40%;
	}

	.logo {
		top: 5vh;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.address {
		position: absolute;
		width: 80%;
		left: 70%;
		top: 20vh;
		font-size: 3.5vh;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		transform: translateX(-50%);
	}

	.lockId {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 25vh;
		font-size: 2vh;
	}

	.state {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 28vh;
		font-size: 2vh;
		color: #000000;
	}
	
	.wifi {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 31vh;
		font-size: 2vh;
		color: #000000;
	}
	
	.functions{
		position: absolute;
		top: 45%;
		width: 90%;
		left: 5%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-items: center;
		justify-content: center;
		align-items: center;
	}
	.function{
		margin-bottom: 1vh;
		width: 25%;
		height: 20vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.description{
		font-size: 1.1rem;
		margin-top: 2vh;
	}
	.button{
		position: absolute;
		width: 80%;
		bottom: 5%;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
