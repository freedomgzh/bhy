<template>
	<view class="content">
		<view class="tab flex">
			<view class="lab flexCol flexYc flex-grow-1" :class="{active:index==2}" @tap="change(2)">
				<text>进行中({{hasnum}})</text>
				<view :class="{activeBottom:index==2}" >
					
				</view>
			</view>
			<view class="lab flexCol flexYc flex-grow-1" :class="{active:index==3}" @tap="change(3)">
				<text>已完成({{notnum}})</text>
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
				<view class="label ">
					订单号：{{s.orderNo}}
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
				<view class="label flexXb">
					<text>清罐房间号：{{s.qingGuanRoomId}}</text>
					<text>铅封房间号：{{s.qianFengRoomId}}</text>
				</view>
			</view>
			<view class="btnsBox flexXb flexYc">
				<view class="btns flexYc flexXc" @tap="getNumber(s.id)" v-if="index == 2">
					填写铅封号	
				</view>
				<view class="btns flexYc flexXc" @tap="todetail(s.id)" v-else>
					查看铅封号
				</view>
				
				<view class="btns flexYc flexXc" @tap="getCvideo(s.qingGuanRoomId)" v-if="index == 2">
					清罐进场
				</view>
				<view class="btns flexYc flexXc" @tap="wCvideo(s.id)" v-else>
					查看清罐
				</view>
				<view class="btns flexYc flexXc" @tap="getQvideo(s.qianFengRoomId)" v-if="index == 2">
					出厂施封
				</view>
				<view class="btns flexYc flexXc" @tap="wQvideo(s.id)" v-else>
					查看铅封
				</view>
				<view class="btns flexYc flexXc" @tap="finish(s.id)" v-if="index == 2">
					完成订单
				</view>
			</view>
			
		</view>		
		
		<view class="videoBox" :style="{top:height + 'px'}" v-if="showVideo" @tap="close">
			<view class="chooseContent" >
				<view class="title flexXa">
					<view class="">
							
					</view>
					<view class="">
						查看铅封视频
					</view>	
					<image class="closeImg" src="../../static/关闭%20(10)%20拷贝%203@3x.png" mode=""></image>
				</view>
				 <view @tap="choose(i)" class="box" v-for="(s,i) in vlist" :key='i'>视频{{i + 1}}</view>
					
			</view>	
		</view>
		
		<view class="videoBoxs":style="{top:height + 'px'}" v-if="hasChoose" >
			<view class="close flexXc flexYc" @tap="closeBox">
				<image class="closeBtn" src="../../static/关闭%20(10)%20拷贝%203@3x.png" mode=""></image>
			</view>
			<video v-if="hasChoose" id="myVideo" :src="vlist[i].url"
			                @error="videoErrorCallback" :danmu-list="danmuList" enable-danmu danmu-btn controls></video>   
				
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 2,
				list:[],
				url:'',
				showVideo:false,
				height:'',
				hasChoose:false,
				i:0,
				vlist:[],
				hasnum:0,
				notnum:0
				
			}
		},
		onLoad() {
			this.getnum()
		 
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
					that.getList(that.index)
					
				}else{
					
					console.log(data+"假的")
					uni.navigateTo({
						url:'../login/login'
					})
				}
					
			});		
		},
		watch:{
			index(n,o){
				this.getList(n)
			}
		},
		methods: {
			change(i){
				this.index = i
			},
			async getnum(v){
				
				
				const r = await this.$api.GetOrderNum({adminId:uni.getStorageSync('userInfo').id})
				console.log('r=========',uni.getStorageSync('userInfo').user_id)
				if(r.data.Status == 1){
					this.hasnum=r.data.Data.haveingCount
					this.notnum=r.data.Data.completeCount
					console.log('==========',this.hasnum)
				}else{
					uni.showToast({
						title:r.data.Memo,
						icon:'none'
					})
				}
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
			async finish(id){
				const r = await this.$api.CompleteOrder({orderId:id})
				console.log('r=========',r)
				if(r.data.Status == 1){
					
					this.getList(2)
					
				}else{
					uni.showToast({
						title:r.data.Memo,
						icon:'none'
					})
				}
			},
			
			getQvideo(id){
				console.log(0)
				uni.navigateTo({
					url:'../meeting/meeting?id=' + id
				})
				
			},
			getCvideo(id){
				console.log(0)
				uni.navigateTo({
					url:'../meeting/meeting?id='  + id
				})
			},
			async wCvideo(id){
				const r =await this.$api.GetVideoUrl({orderId:id,type:2})
				console.log('video===========',r)
				if(r.data.Status == 1){
					this.vlist=r.data.Data.Rows
					
				}else{
					uni.showToast({
						title:r.data.Memo,
						icon:'none'
					})
				}
				this.showVideo = true
			},
			async wQvideo(id){
				const r =await this.$api.GetVideoUrl({orderId:id,type:1})
				if(r.data.Status == 1){
					this.vlist=r.data.Data.Rows
					
				}else{
					uni.showToast({
						title:r.data.Memo,
						icon:'none'
					})
				}
				
				
				this.showVideo = true
			},
			getNumber(id){
				uni.navigateTo({
					url:'../writeNumber/writeNumber?id=' + id
				})
			},
			todetail(id){
				uni.navigateTo({
					url:'../numberDetail/numberDetail/numberDetail?id=' + id
				})
			},
			close(){
				this.showVideo = false
			},
			closeBox(){
				this.hasChoose = false
			},
			choose(index){
				this.i = index
				this.hasChoose = true
			}
		},
		onPageScroll(res) {  
		
				this.height  = res.scrollTop;
				
		
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
	.videoBox{
		position: absolute;
		top: 0;
		width: 750upx;
		height: 100%;
	}
	.videoBoxs{
		position: absolute;
		top: 0;
		width: 750upx;
		height: 100%;
	}
	.chooseContent{
		position: absolute;
		top: 50%;
		
		left: 50%;
		transform: translate(-50%);
		background-color: #FFFFFF;
		border-radius: 10upx;
		width:calc( 100% - 140upx);
		padding-bottom: 40upx;
	}
	video{
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		width: 100%;
		z-index: 10000;
	}
	
	.closeBtn{
		width: 50upx;
		height: 50upx;
	}
	.close{
		font-size: 28upx;
		line-height: 80upx;
		margin-top: 20px;
		background-color: #FFFFFF;
		width: 120upx;
		text-align: center;
		border-radius: 10upx;
		height: 80upx;
		text-align: center;
		
	}
	.closeImg{
		width: 50upx;
		height: 50upx;
	}
	.title{
		height: 100upx;
		line-height: 100upx;
	}
	.box{
		height: 80upx;
		width: 462upx;
		line-height: 80upx;
		text-align: center;
		margin-left: 90upx;
		border: 2upx solid#000000;
		border-radius: 5upx;
		margin-bottom: 10upx;
	}
</style>
