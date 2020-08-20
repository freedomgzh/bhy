<template>
	<view class="content">
		<view class="list" v-for="(s,i) in list" :key="i">
			<view class="title flexYc">
				铅封号{{'('+(i+1)+')'}}：{{s.fengNo}}
			</view>
			<view class="imglist flexXb" v-for="(c,ci) in s.fengImg" :key="ci">
				<image :src="c" mode="" class="imgs"></image>
			</view>
			<view class="title flexYc">
				密封号{{'('+(i+1)+')'}}：{{s.mifengNum}}
			</view>
			<view class="imglist flexXb" v-for="(c,ci) in s.mifengImg" :key="ci">
				<image :src="c" mode="" class="imgs"></image>
			</view>
			<view class="">
				<view class="t flexYc">
					签收密封码
				</view>
				<view class="flexXa flexYc">
					<view class="inputBox flexYc">
						<input type="text" value="" :data-index='i' @input="lOrder" placeholder-style="color: #CACACA;" placeholder="请输入密封码" />
					
					</view>
					<view @tap="sub(s)" class="btns flexXc flexYc">
						提交
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		methods: {
			async getList(orderId){
				const r = await this.$api.GetQianFengList({orderId})
				if(r.data.Status == 1){
					r.data.Data.Rows.forEach((s,i)=>{
						s.fengImg= s.fengImg.split(';')
					})
					this.list=r.data.Data.Rows
					console.log('============',this.list)
					
				}else{
					uni.showToast({
						title:r.data.Memo,
						icon:'none'
					})
				}
				console.log('r====',r)
			}
		},
		onLoad(e) {
			const orderId = e.id
			this.getList(orderId)
		},
		
	}
</script>

<style>
	page{
		background-color:#F6F6F6 ;
	}
	.content{
		background-color:#F6F6F6 ;
		padding-top: 16upx;
	}
	.list{
		margin-bottom: 18upx;
		background-color: #FFFFFF;
		font-size: 28upx;
	}
	.title{
		height: 87upx;
		border-bottom: 2upx solid#EEEEEE;
		padding-left: 20upx;
	}
	.t{
		height: 87upx;
		padding-left: 20upx;
	}
	.imglist{
		display:flex; 
		flex-wrap:wrap;
		padding: 20upx 20upx 10upx 20upx;
	}
	.imgs{
		width: 220upx;
		height: 220upx;
		border-radius: 10upx;
		margin-bottom: 10upx;
	}
	.inputBox {
		height: 88upx;
		margin: 0 31upx 0 19upx;
		border: 1upx solid##DDDDDD;
		border-radius: 10upx;
		font-size: 28upx;
		flex-grow: 1;
	}
	
	.inputBox input {
		color: #CACACA;
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
