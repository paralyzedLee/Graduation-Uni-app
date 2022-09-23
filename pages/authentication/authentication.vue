<!-- 个人认证 -->
<template>
	<view class="container">
		<view v-show="type">
			<view class="step" style="margin-top: 3vh;">
				<u-steps :current='state'>
					<u-steps-item title="提交信息"></u-steps-item>
					<u-steps-item title="正在审核"></u-steps-item>
					<u-steps-item title="认证成功" v-if="info.state == 1"></u-steps-item>
					<u-steps-item title="认证失败" error="true" v-if="info.state == 2"></u-steps-item>
				</u-steps>
			</view>
			<view class="form">
				<u-form labelPosition="left" :model="info" ref="info">
					<u-form-item label="姓名" prop="name" borderBottom ref="item1" labelWidth="100">
						<input v-model="info.realName" border="none" placeholder="请输入姓名" :disabled='Boolean(state)'
							@blur="nameBlur()"></input>
					</u-form-item>
					<u-form-item label="身份证号" prop="idCard" borderBottom ref="item2" labelWidth="100">
						<input v-model="info.idCardNumber" border="none" placeholder="请输入身份证号"
							:disabled='Boolean(state)' @blur="cardBlur()"></input>
					</u-form-item>
					<u-form-item label="手机号" prop="phoneNumber" borderBottom ref="item3" labelWidth="100">
						<input v-model="info.phoneNumber" border="none" placeholder="请输入手机号" :disabled='Boolean(state)'
							@blur="phoneBlur()"></input>
					</u-form-item>
				</u-form>
				<view class="changeTextView">
					<a class="changeText" style="margin-left: 12rpx;" @click="reRegister">重新认证</a>
				</view>
				<button type="default" class="button" @click="submit" :disabled='Boolean(state)'>提交</button>
			</view>
		</view>
		<view v-show="!type">
			<view class="form">
				<u-form labelPosition="left" :model="info" ref="info">
					<u-form-item label="手机号" prop="phoneNumber" borderBottom ref="item3" labelWidth="100">
						<input v-model="info.phoneNumber" border="none" placeholder="请输入手机号" :disabled='Boolean(state)'
							@blur="phoneBlur()"></input>
					</u-form-item>
				</u-form>
				<view class="changeTextView">
					<a class="changeText" @click="()=>{type = 1}">点击切换用户注册</a>
					<view class="mid"></view>
					<a class="changeText" @click="reRegister">重新认证</a>
				</view>
				<button type="default" class="button" @click="submit" :disabled='Boolean(state)'>提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import checkID from '../../utils/commonFunction.js'
	import {
		getUser,
		updateUser
	} from 'api/service/login.js'
	export default {
		data() {
			return {
				info: {
					state: 0,
					id: '',
					realName: '',
					idCardNumber: '',
					phoneNumber: '',
				},
				type: 1, 
				state: 0,
			}
		},
		onLoad() {
			getUser((res) => {
				const data = res?.data?.data
				this.info = JSON.parse(JSON.stringify(data))
				this.stateInit()
			})
		},
		methods: {
			submit() {
				if (this.type == 1) {
					this.nameBlur()
					this.phoneBlur()
					this.cardBlur()
					if (this.info?.realName && this.info?.idCardNumber && this.info?.phoneNumber) {
						console.log(this.info)
						updateUser(this.info, (res) => {
							console.log("updateUser的callback", res)
							uni.showModal({
								title: "提示",
								content: "注册成功，请等待管理员审核！",
								showCancel: false,
								complete: () => {
									uni.reLaunch({
										url:'/pages/authentication/authentication'
									})
								}
							})
						})
					}
				} else if (this.type == 0) {
					this.phoneBlur()
					if (this.info?.phoneNumber) {
						console.log(this.info)
						updateUser({
							phoneNumber: this.info?.phoneNumber
						}, (res) => {
							console.log("updateUser的callback", res)
							uni.showModal({
								content: "注册成功！",
								showCancel: false,
								complete: () => {
									uni.navigateTo({
										url: '/pages/authentication/authentication'
									})
								}
							})
						})
					}
				}
			},
			nameBlur() {
				var reg_user = /^[\u4e00-\u9fa5]{2,4}$/; //2-4个中文字符正则
				if (!reg_user.test(this.info?.realName)) {
					uni.showModal({
						title: '提示',
						content: '姓名在2~4个汉字之间，请重新填写。',
						showCancel: false
					})
					this.info.realName = ''
				}
			},
			phoneBlur() {
				var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
				if (!reg_tel.test(this.info?.phoneNumber)) {
					uni.showModal({
						title: '提示',
						content: '无效手机号，请重新填写。',
						showCancel: false
					})
					this.info.phoneNumber = ''
				}
			},
			//校验身份证号
			cardBlur: function() {
				const val = this.info?.idCardNumber;
				if (this.checkID(val)) {} else {
					uni.showModal({
						title: '提示',
						content: '无效身份证号，请重新填写。',
						showCancel: false
					})
					this.info.idCardNumber = ''
				}
			},
			checkID: checkID,
			stateInit() {
				switch (this.info.state) {
					case -1:
						this.state = 0;
						break;
					case 0:
						this.state = 1;
						break;
					case 1:
						this.state = 2;
						break;
					case 2:
						this.state = 2;
						break;
					default:
						this.state = 0;
				}
			},
			reRegister() {
				this.state = 0;
				this.info = {};
			},
		},
	}
</script>

<style>
	.container {
		padding: 1rpx;
		height: 100%;
	}

	.form {
		padding: 5% 5% 0 5%;
	}

	.changeTextView {
		position: absolute;
		bottom: calc(120rpx + 5%);
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.changeText {
		font-size: 14;
		text-decoration: underline;
		color: #666666;
		white-space: nowrap;
	}

	.button {
		position: absolute;
		width: 80%;
		bottom: 5%;
		left: 50%;
		transform: translateX(-50%);
	}
	.mid {
		display: inline-block;
		height: 10px;
		width: 1px;
		margin: 0 10px;
		vertical-align: middle;
		background-color: #e2e2e2;
	}
</style>
