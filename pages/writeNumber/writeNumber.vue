<template>
	<view class="content">
		<view class="listBox">
			<view class="list flexYc" v-for='(s,i) in arr ' :key="i">
				<view class="flex-grow-1 padding">
					
				<view class="flex bottom">
					
				
				<view class=" camera flexCol flexYc flexXc">
					<image src="../../static/camera.png" mode="" class="cameraImg" v-if="!dataArr[i].imgUrl"></image>
					<image :src="dataArr[i].imgUrl" mode="" class="cameraImg" v-else></image>
					<view @tap="upLoad(i)">添加照片</view>
				</view>

				<view class="inputBox flexYc">
					<input type="text" value="" :data-index='i' @input="lOrder2" placeholder-style="color: #CACACA;" placeholder="请输入铅封号" />

				</view>
				</view>
				<view class="flex">
					
				
				<view class=" camera flexCol flexYc flexXc">
					<image src="../../static/camera.png" mode="" class="cameraImg" v-if="!dataArr[i].imgUrl"></image>
					<image :src="dataArr[i].mifengImgUrl" mode="" class="cameraImg" v-else></image>
					<view @tap="upLoad2(i)">添加照片</view>
				</view>
				
				<view class="inputBox flexYc">
					<input type="text" value="" :data-index='i' @input="lOrder" placeholder-style="color: #CACACA;" placeholder="请输入密封码" />
				
				</view>
				</view>
				</view>
				<view class="countBtns flex">
					<view class="btns" @tap="count">
						<image src="../../static/count.png" mode="" class="countImg"></image>
					</view>
					<view class="btns" @tap="discount(i)">
						<image src="../../static/discount.png" mode="" class="discountImg"></image>
					</view>

				</view>
			</view>
		</view>
		<view class="btnsubmit" @tap="freeTell">
			提交
		</view>
	</view>
</template>

<script>
	import vue from 'vue';
	export default {
		data() {
			return {
				arr: [0],
				dataArr: [{
					qianfengNum:'',
					imgUrl:'',
					mifengNum:'',
					mifengImgUrl:''
				}],
				orderId: ''
			}
		},
		onLoad(e) {
			this.orderId = e.id
		},
		methods: {
			count() {
				this.arr.push(this.arr.length);
				this.dataArr.push({
					qianfengNum:'',
					mf:'',
					imgUrl:''
				})
			},
			discount(i) {
				this.dataArr.splice(i,1)
				this.arr.splice(i,1)
				// const arr = this.dataArr;
				// const list = this.arr;
				// delete arr[i];
				// delete list[i];
				// this.dataArr = arr;
				// this.arr = list;
				console.log(this.dataArr,this.arr,i)
			},
			lOrder(e) {
				    var i = e.currentTarget.dataset.index
					const data =     this.dataArr[i]
					data.qianfengNum = e.detail.value
					vue.set(this.dataArr,i,data)  
					console.log('e==============', e)
			},
			lOrder2(e) {
				    var i = e.currentTarget.dataset.index
					const data =     this.dataArr[i]
					data.mifengNum = e.detail.value
					vue.set(this.dataArr,i,data)  
					console.log('e==============', e)
			},
			async  upLoad(i) {
				var self = this
				const res = await uni.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					// success: function (res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					//   var tempFilePaths = res.tempFilePaths;
					//   self.imgSrc = tempFilePaths;
					//   console.log('tempFilePaths', tempFilePaths);

					//   uni.showLoading({
					// 	title: '上传中',
					//   })
					//    console.log(formApi.header);

					// 	},
					// 	fail: function (res) {
					// 	  uni.hideLoading()
					// 	  console.log(res.data)
					// 	}
				})
				console.log('img==============================', res)
				if (res[1].errMsg = "chooseImage:ok") {
					var tempFilePaths = res[1].tempFilePaths;
					self.imgSrc = tempFilePaths;
					console.log('tempFilePaths', tempFilePaths);

					uni.showLoading({
						title: '上传中',
					})
					
					const r = await uni.uploadFile({
						url: `${self.$api.picUrl}/upload.ashx`,
						fileType: "image",
						filePath: self.imgSrc[0] + "",
						// filePath:'',
						name: 'file',
						formData: {
							filePath: self.imgSrc[0] + "",
						},
						header: {
							'Content-Type':'multipart/form-data'
						},
					})
					console.log('r===============',r)
					if (r[1].errMsg = "chooseImage:ok") {
						console.log('上传商品图片res.data.pic_url', r)

						const data = JSON.parse(r[1].data)
						if (data.Status == 1) {
							//   const index = data.data.indexOf('/static');
							//   self.imgUrl =   data.data.substr(index+1,r[1].data.length)
							
							
							console.log('data========',data)
							const datas =     this.dataArr[i]
							datas.imgUrl = data.Data.path
							vue.set(this.dataArr,i,datas)  
							
							uni.showToast({
								title: '图片上传成功',
							})
							uni.hideLoading()
						} else {
							uni.showToast({
								title:data.Memo
							})
							uni.hideLoading()
							
						}
					}
				} else {
					uni.hideLoading()
					console.log(res.data)

				}
			},
			async  upLoad2(i) {
				var self = this
				const res = await uni.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					// success: function (res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					//   var tempFilePaths = res.tempFilePaths;
					//   self.imgSrc = tempFilePaths;
					//   console.log('tempFilePaths', tempFilePaths);
			
					//   uni.showLoading({
					// 	title: '上传中',
					//   })
					//    console.log(formApi.header);
			
					// 	},
					// 	fail: function (res) {
					// 	  uni.hideLoading()
					// 	  console.log(res.data)
					// 	}
				})
				console.log('img==============================', res)
				if (res[1].errMsg = "chooseImage:ok") {
					var tempFilePaths = res[1].tempFilePaths;
					self.imgSrc = tempFilePaths;
					console.log('tempFilePaths', tempFilePaths);
			
					uni.showLoading({
						title: '上传中',
					})
					
					const r = await uni.uploadFile({
						url: `${self.$api.picUrl}/upload.ashx`,
						fileType: "image",
						filePath: self.imgSrc[0] + "",
						// filePath:'',
						name: 'file',
						formData: {
							filePath: self.imgSrc[0] + "",
						},
						header: {
							'Content-Type':'multipart/form-data'
						},
					})
					console.log('r===============',r)
					if (r[1].errMsg = "chooseImage:ok") {
						console.log('上传商品图片res.data.pic_url', r)
			
						const data = JSON.parse(r[1].data)
						if (data.Status == 1) {
							//   const index = data.data.indexOf('/static');
							//   self.imgUrl =   data.data.substr(index+1,r[1].data.length)
							
							
							console.log('data========',data)
							const datas =     this.dataArr[i]
							datas.mifengImgUrl = data.Data.path
							vue.set(this.dataArr,i,datas)  
							
							uni.showToast({
								title: '图片上传成功',
							})
							uni.hideLoading()
						} else {
							uni.showToast({
								title:data.Memo
							})
							uni.hideLoading()
							
						}
					}
				} else {
					uni.hideLoading()
					console.log(res.data)
			
				}
			},
			
			async freeTell(){
				const r = await this.$api.AddQianfeng({orderId:this.orderId,data:JSON.stringify( {rows:this.dataArr})  })
				console.log('r=================',r)
				if(r.data.Status == 1){
					uni.switchTab({
						url:'../index/index'
					})
					
				}else{
					uni.showToast({
						title:r.data.Memo,
						icon:'none'
					})
				}
			},
			
		}
	}
</script>

<style>
	page {
		height: 100%;

	}

	.content {
		width: 100%;
		height: 100%;
		background-color: #F6F6F6;
		padding-top: 20upx;
	}

	.listBox {

		background-color: #FFFFFF;
		width: 100%;
		height: calc(100% - 20upx);
		margin-bottom: 200upx;
	}

	.list {
		/* height: 147upx; */
		margin: 0upx 20upx 0upx 20upx;
		border-bottom: 1upx solid#EEEEEE;
	}

	.camera {
		width: 128upx;
		height: 88upx;
		border: 1upx solid#DDDDDD;
		border-radius: 10upx;

	}

	.camera view {
		font-size: 22upx;
		color: #CACACA;
	}

	.cameraImg {
		width: 45upx;
		height: 39upx;
	}

	.countBtns image {
		width: 46upx;
		height: 46upx;
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

	.countImg {
		margin-right: 30upx;
	}

	.btns {
		height: 100%;
	}
	.btnsubmit{
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
	.bottom{
		margin-bottom: 20upx;
	}
	.padding{
		padding: 10upx 0 ;
	}
</style>
