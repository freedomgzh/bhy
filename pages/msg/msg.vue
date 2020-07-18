<template>
	<view class="content">
		<view class="list" v-for="(s,i) in list" :key="i">
			<view class="flexXb flexYc">
				<text class="title">{{s.title}}</text>
				<text class="time">{{s.postTime}}</text>
				
			</view>
			<view class="cont">
				{{s.content}}
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[]
			}
			
		},
		methods:{
			async getMes(){
				const data={
					msgType:2,
					userId:this.$store.getters.userinfo.id
				}
				const r = await this.$api.getMessageList(data)
				
				console.log('r===========',r)
				if(r.data.Status == 1){
					this.list = r.data.Data.Rows
					console.log('r===========',this.list)
				}else{
					uni.showToast({
						title:r.data.Memo,
						icon:"none"
					})
				}
			}
		},
		onLoad() {
			this.getMes();
		}
	}
</script>

<style>
	page{
		height: 100%;
		background-color: #F6F6F6;
	}
	.content{
		height: 100%;
		margin-top: 20upx;
		
		background-color: #FFFFFF;
	}
	.title{
		font-size: 30upx;
		font-weight: 400;
	}
	.time{
		font-size:24upx ;
		color: #999999;
	}
	.list{
		padding: 29upx 21upx 30upx 21upx; 
		border-bottom: 1upx solid#EEEEEE;
		
		
	}
	.cont{
		color: #999999;
		font-size: 26upx;
		line-height: 50upx;
	}
</style>
