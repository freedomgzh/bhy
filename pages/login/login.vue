<template>
	<view class="login">
		<image class="close" @tap="toIndex" src="../../static/close.png" mode=""></image>
		<view class="title">
			欢迎登陆
		</view>
		<view class="tips">
			请使用账号密码登陆
		</view>
		<view class="box">
			<view class="inputbox flexYc">
				<input type=""  @input='listenPhone' v-model="phone" placeholder="请输入用户名" />
			</view>
			<view class="inputbox flexYc">
				<input type=""  @input='listenCode' v-model="code" placeholder="请输入密码" />
			</view>
			
		</view>
		<view class="btns flexYc flexXc " @tap="login">
			<text>登陆</text>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				phone:'',
				code:''
			}
		},
		methods:{
			listenPhone(e){
				this.phone = e.detail.value
			},
			listenCode(e){
				this.code = e.detail.value
			},
			async login(){
				if(!this.phone){
					uni.showToast({
						title:'请输入账号'
					})
					return
				}
				if(!this.code){
					uni.showToast({
						title:'请输入密码'
					})
					return
				}
				const postData={
					username:this.phone,
					password:this.code
					
				}
				const r = await  this.$api.login(postData)
				console.log('r===========',r)
				if(r.data.Status == 1){
					uni.setStorageSync('userInfo',r.data.Data)
					uni.switchTab({
						url:'../index/index'
					})
				}else{
					uni.showToast({
						title:r.data.Memo,
						icon:'none'
					})
				}
				
			}
		},
		toIndex(){
			uni.switchTab({
				url:'../index/index'
			})
		}
	}
</script>

<style>
	.login{
		height: 100%;
		padding-top: 210upx;
		padding-left: 59upx;
		padding-right: 59upx;
	}
	.title{
		font-size: 48upx;
		font-weight: 800;
	}
	.tips{
		margin-top: 33upx;
		font-size:24upx;
	}
	.box{
		margin-top: 46upx;
		color: #B8B8B8;
		font-size: 26upx;
	}
	.box .inputbox{
		height: 100upx;
		border-bottom: 2upx solid#EEEEEE;
	}
	.btns{
		background-color: #005EA1;
		height: 76upx;
		border-radius: 38upx;
		color: #FFFFFF;
		font-size: 30upx;
		margin-top: 80upx;
	}
	.close{
		width: 60upx;
		height: 60upx;
		position: absolute;
		top: 75upx;
		left: 20upx;
	}
</style>
