<template>
	<view class="content">
		<view class="top flexYc">
			
				<image :src="user.headImg" mode="" class="headLogo"></image>
				<text>{{user.username}}</text>
			
		</view>
		<view class="list">
			<view class=" flexXb flexYc label"  @tap="toPerson">
				<view class="flexYc">
					<image src="../../static/person.png" mode="" class="personimg"></image>
					<text>个人信息</text>
				</view>
				<image src="../../static/arrow.png" mode="" class="arrow"></image>
			</view>
			<view class="flexXb flexYc label" @tap="phone">
				<view class="flexYc">
					<image src="../../static/kf.png" mode=""  class="kefuimg"></image>
					<text>客服电话</text>
				</view>
			
				<image src="../../static/arrow.png" mode="" class="arrow"></image>
			</view>
			<view class="flexXb flexYc label" @tap="suggess">
				<view class="flexYc">
					<image src="../../static/suggess.png" mode=""  class="suggessimg"></image>
					<text>意见反馈</text>
				</view>
				
				<image src="../../static/arrow.png" mode="" class="arrow"></image>
			</view>
			<view class="flexXb flexYc label" @tap="setting">
				<view class="flexYc">
					<image src="../../static/setting.png" mode=""  class="settingimg"></image>
					<text>设置</text>
				</view>
				
				<image src="../../static/arrow.png" mode="" class="arrow"></image>
			</view>
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
			this.user = this.$store.getters.userinfo
		},
		methods:{
			toPerson(){
				console.log(1111111)
				uni.navigateTo({
					url:'./psersonInfo'
				})
			},
			phone(){
				console.log(1111111)
				uni.navigateTo({
					url:'./phone'
				})
			},
			setting(){
				console.log(1111111)
				uni.navigateTo({
					url:'./setting'
				})
			},
			suggess(){
				console.log(1111111)
				uni.navigateTo({
					url:'./suggess'
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
		background-color: #F6F6F6;
	}
	.top{
		height: 210upx;	
		background-color: #187BCD;
		color: #FFFFFF;
		font-size: 34upx;
	}
	.headLogo{
		border-radius: 50%;
		height: 110upx;
		width: 110upx;
		margin-right: 20upx ;
		margin-left: 30upx;
	}
	.list{
		font-size: 28upx;
		background-color: #FFFFFF;
		border-radius: 8upx;
		margin: 20upx;
	}
	.label{
		height: 105upx;
		border-bottom: 2upx solid#EEEEEE;
	}
	.personimg{
		height: 46upx;
		width: 40upx;
		margin-right: 21upx;
		margin-left: 30upx;
	}
	.kefuimg{
		height: 41upx;
		width: 40upx;
		margin-right: 21upx;
		margin-left: 30upx;
	}
	.suggessimg{
		height: 42upx;
		width: 40upx;
		margin-right: 21upx;
		margin-left: 30upx;
	}
	.settingimg{
		height: 42upx;
		width: 41upx;
		margin-right: 21upx;
		margin-left: 30upx;
	}
	.arrow{
		width: 14upx;
		height: 25upx;
		margin-right: 20upx;
	}
</style>
