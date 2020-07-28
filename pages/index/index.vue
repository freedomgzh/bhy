<template>
	<view class="content">
		<view class="tab flex">
			<view class="lab flexCol flexYc flex-grow-1" :class="{active:index==2}" @tap="change(2)">
				<text>进行中</text>
				<view :class="{activeBottom:index==2}" >
					
				</view>
			</view>
			<view class="lab flexCol flexYc flex-grow-1" :class="{active:index==3}" @tap="change(3)">
				<text>已完成</text>
				<view :class="{activeBottom:index==3}">
					
				</view>
			</view>
		</view>
		<view class="list" v-for="(s,i) in list" :key="i">
			<view class="top flexYc flexXb">
				<view class="flex flexYc">
					<image :src="s.carImgs" mode="" class="logo"></image>
					<view class="">
						{{s.factoryName}}
					</view>
				</view>
				<view class="status">
					{{s.status}}
				</view>
			</view>
			<view class="listContent">
				<view class="label ">
					地点：{{s.factoryName}}
				</view>
				<view class="label flexXb">
					<text>到厂时间：{{s.daochangTime}}</text>
					<text>监督项：{{s.workContent}}</text>
					
				</view>
				<view class="label flexXb">
					<text>驾驶员：{{s.driverName}}</text>
					<text>随车电话：{{s.mobile}}</text>
					
				</view>
				<view class="label flexXb">
					<text>运输物：{{s.goodsName}}</text>
					<text>车牌号：{{s.carNumber}}</text>
				</view>
			</view>
			<view class="btnsBox flexXb flexYc">
				<view class="btns flexYc flexXc" @tap="getNumber(s.id)">
					填写铅封号
				</view>
				<view class="btns flexYc flexXc" @tap="getQvideo">
					发起铅封
				</view>
				<view class="btns flexYc flexXc" @tap="getCvideo">
					发起清罐
				</view>
				<view class="btns flexYc flexXc" @tap="finish">
					完成订单
				</view>
			</view>
		
		</view>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 2,
				list:[]
			}
		},
		onLoad() {
		
		 
		},
		onShow() {
			var that=this;
			
			function st(){
				return  that.$store.dispatch('isLogin')
			}
			console.log(that.$store)
			 st().then(function(data){
				console.log(1111)
				if(data){
					
					console.log("镇的")
					that.hasLoginData = 1
					console.log(that.$store,that.hasLoginData)
					that.getList(2)
					
				}else{
					
					console.log(data+"假的")
					uni.navigateTo({
						url:'../login/login'
					})
				}
					
			});		
		},
		watch:{
			
		},
		methods: {
			change(i){
				this.index = i
			},
			async getList(v){
				
				console.log('====================',this.$store.getters.userinfo)
				const r = await this.$api.getOrderList({state:v,adminId:this.$store.getters.userinfo.id})
				console.log('r=========',r)
				if(r.data.Status == 1){
					this.list=r.data.Data.Rows
					
				}else{
					uni.showToast({
						title:r.data.Memo,
						icon:'none'
					})
				}
			},
			getQvideo(){
				console.log(0)
				uni.navigateTo({
					url:'../meeting/meeting'
				})
			},
			getCvideo(){
				
			},
			getNumber(id){
				uni.navigateTo({
					url:'../writeNumber/writeNumber?id=' + id
				})
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
	}
	.content {
		background-color: #F6F6F6;
		height: 100%;
	/* 	display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; */
	}



	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.tab{
		height: 110upx;
		width: 100%;
		font-size: 30upx;
		background-color: #FFFFFF;
		color: #999999;
		
	}
	.list{
		margin-top: 20upx;
		margin-left: 20upx;
		margin-right: 20upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
	}
	.lab{
		margin-top: 32upx;
	}
	.active{
		color: #000000;
	}
	.activeBottom{
		width: 34upx;
		height: 5upx;
		background-color: #187BCD;
		/* border-radius: 50%; */
		margin-top: 10upx;
	}
	.top{
		font-size: 28upx;
		height: 100upx;
		border-bottom: 1upx solid#EEEEEE;
		
	}
	.logo {
		height: 80rpx;
		width: 80rpx;
		margin:0 21upx;
	}
	.status{
		color: #005EA1;
		font-size: 26upx;
		margin-right: 25upx;
	}
	.listContent{
		font-size: 26upx;
		padding-top:10upx;
		padding-left: 18upx;
	}
	.label{
		line-height: 60upx;
	}
	.label text{
		width: 50%;
	}
	.btnsBox{
		height: 100upx;
		padding: 0 20upx;
	}
	.btns{
		color: #FFFFFF;
		background-color: #005EA1;
		font-size: 26upx;
		height: 60upx;
		width: 151upx;
		border-radius: 10upx;
	}
	
</style>
