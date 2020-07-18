<template>
	<view class="content">
		<view class="list flexYc flexXb">
			<text>客服电话</text>
			<text class="h">400-400-100</text>
		</view>
		<view class="btns" @tap="freeTell">
			拨打客服电话
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			freeTell: function(){
			
			    uni.makePhoneCall({
			
			      phoneNumber: '400-400-100',
			
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
		padding-top: 19upx;
		/* position: relative; */
	}
	.list{
		height: 100upx;
		padding:0 19upx;
		background-color: #FFFFFF;
		font-size: 28upx;
	}
	.h{
		color: #999999;
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
