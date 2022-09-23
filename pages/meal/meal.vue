<template>
	<view class="container">
		<view class="coupon">
			<image src="../../static/tiao.png" class="couImage"></image>
			<text class="Word">餐券</text>
		</view>
		<button class="primary">领取餐券</button>
	</view>
</template>

<script>

</script>

<style>
	.container {
		background-color:#c0d8f1;
		padding: 1rpx;
		height: 100%;
	}
	
	.text{
		position: relative;
		width: 60%;
		bottom: 6%;
		left: 50%;
		transform: translateX(-50%);
		color: #0289ff;
	}
	
	.coupon{
		background-color: white;
		width: 90%;
		margin: 20rpx auto 0;
		position: relative;
		min-height: 300px;
		border-radius: 1em 1em 1em 1em;
		display: flex;
	}
	
	.couImage {
		position: absolute;
		width: 270px;
		height: 100px;
		left: 4%;
		margin-left: 40rpx;
		top: 30%;
	}
	
	.Word {
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		top: calc(5% + 220rpx);
		font-size: 40rpx;
	}
</style>