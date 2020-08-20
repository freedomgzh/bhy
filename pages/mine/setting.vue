<template>
	<view class="content">
		<!-- <view class="list flexYc flexXb">
			<text>头像</text>
			<image src="../../static/arrow.png" mode="" class="arrow"></image>
		</view> -->
		<view class="list flexYc flexXb">
			<text>手机号</text>
			<view class=" flexYc">
				<text>{{user.mobile}}</text>
<!-- 				<image src="../../static/arrow.png" mode="" class="arrow"></image>
 -->			</view>
			
		</view>
		<view class="btns" @tap="sub">
			退出登录
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				user:{}
			}
			
		},
		onLoad() {
			console.log(1111111111)
			this.user = this.$store.getters.userinfo
		},
		methods:{
			sub(){
				uni.removeStorage({
					key:"userInfo",
					complete() {
						uni.switchTab({
							url:'../index/index'
						})
					}
				})
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
	}
	.content{
		height: 100%;
		background-color: #FFFFFF;
		padding-top: 19upx;
	}
	.list{
		height: 100upx;
		padding:0 19upx;
		background-color: #FFFFFF;
		font-size: 28upx;
	}
	.arrow{
		width: 14upx;
		height: 25upx;
		margin-right: 20upx;
		margin-left: 20upx;
	}
	.btns{
		position: absolute;
		bottom: 60upx;
		left: 20upx;
		height: 84upx;
		width: 710upx;
		border-radius: 10upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 84upx;
		background-color: #005EA1;
		font-size: 32upx;
	}
</style>
