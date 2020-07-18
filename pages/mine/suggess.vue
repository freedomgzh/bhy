<template>
	<view class="content">
		<view class="top">
			<text class="title">您的声音是我们前进的助力</text>
			<textarea @input="lS" class="area" value="" placeholder-style="font-size:26rpx;color:#CACACA" placeholder="请输入10个字以上,以便为您提供更好的服务" />
		</view>
		<view class="btns" @tap="sub">
			提交反馈
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				sug:''
			}
		},
		onLoad() {
			
		},
		methods:{
			lS(e){
				this.sug = e.detail.value
			},
			async sub(){
				if(!this.sug || this.sug.length<10){
					uni.showToast({
						title:'请输入正确意见'
					})
				}
				const data = {}
				data.userId = this.$store.getters.userinfo.id;
				data.userType = 2
				data.content = this.sug
				const r = await this.$api.FeedBack(data)
				console.log('r=============',r)
				if(r.data.Status == 1){
					uni.switchTab({
						url:'./mine'
					})
					
				}else{
					uni.showToast({
						title:r.data.Memo,
						icon:'none'
					})
				}
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
		padding-top: 20upx;
	}
	.top{
		margin: 0 20upx;
	}
	.title{
		font-size: 28upx;
		line-height: 86upx;
	}
	.area{
		width: calc(100% - 40upx);
		background-color: #F6F6F6;
		padding: 20upx;
		border-radius: 8upx;
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
