<template>
	<view class="content">
		<view class="list flexYc flexXb">
			<text>姓名</text>
			<text>{{user.realname}}</text>
		</view>
		<view class="list flexYc flexXb">
			<text>手机号</text>
			<text>{{user.mobile}}</text>
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
	}
</script>

<style>
	page{
		height: 100%;
	}
	.content{
		height: 100%;
		background-color: #F6F6F6;
		padding-top: 19upx;
	}
	.list{
		height: 100upx;
		padding:0 19upx;
		background-color: #FFFFFF;
		font-size: 28upx;
	}
</style>
