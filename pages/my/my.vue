<template>
	<view class="container">
		<!-- 头像和昵称 -->
		<view class="top-box">
			<open-data type="userAvatarUrl"></open-data>
			<open-data type="userNickName" lang="zh_CN"></open-data>
		</view>
		<view class="myItem" @click="goTo('/pages/authentication/authentication')">
			<view class="icon">
				<u-icon name="attach" size="26"></u-icon>
			</view>
			<view class="text">个人认证</view>
			<view class="arrow">
				<u-icon name="arrow-right" class="arrow"></u-icon>
			</view>
		</view>

		<view class="myItem" @click="goTo('/pages/keyInfo/keyInfo')">
			<view class="icon">
				<u-icon name="home" size="28"></u-icon>
			</view>
			<view class="text">客房信息</view>
			<view class="arrow">
				<u-icon name="arrow-right" class="arrow"></u-icon>
			</view>
		</view>
		<view class="myItem" @click="goTo('/pages/meal/meal')">
			<view class="icon">
				<u-icon name="gift" size="28"></u-icon>
			</view>
			<view class="text">餐券领取</view>
			<view class="arrow">
				<u-icon name="arrow-right" class="arrow"></u-icon>
			</view>
		</view>
		<view class="myItem" @click="goTo('/pages/setting/setting')">
			<view class="icon">
				<u-icon name="setting" size="28"></u-icon>
			</view>
			<view class="text">设置</view>
			<view class="arrow">
				<u-icon name="arrow-right" class="arrow"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {



		data() {
			return {

			}

		},
		
	}
</script>

<style>
	.container {
		padding: 1rpx;
		height: 100%;
		background-color: #c0d8f1;

	}

	.top-box {
		height: 400rpx;
		background-color: #c0d8f1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.avatar {
		display: block;
		width: 90px;
		height: 90px;
		border-radius: 45px;
		border: 2px solid white;
		box-shadow: 0 1px 5px black;
	}

	.nickname {
		color: white;
		font-weight: bold;
		font-size: 16px;
		margin-top: 10px;
	}

	.myItem {
		border-top: 2rpx solid #ffffff;
		position: relative;
		background-color: white;
		height: 13%;
	}

	.icon {
		top: 50%;
		left: 3%;
		transform: translateY(-50%);
		position: absolute;
		width: 100rpx;
	}

	.text {
		top: 50%;
		transform: translateY(-50%);
		left: 15%;
		position: absolute;
		flex-grow: 1;
	}

	.arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 3%;
		width: 50rpx;
		color: #323232;
		font-weight: 600;
	}
</style>
