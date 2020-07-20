<template>
	<view class="content">
		<!--  #ifdef  MP-WEIXIN -->
		<button @click="getopenid" class="pay-btn" type="primary">
			<view class="iconfont iconweixin"></view>
			<text class="title">微信支付</text>
		</button>
		<!--  #endif -->
		<!--  #ifdef  MP-ALIPAY -->
		<button @click="payHandler" class="pay-btn" type="primary">
			<view class="iconfont iconzhifubao"></view>
			<text class="title">支付宝支付</text>
		</button>
		<!--  #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				openId:'',
				appid:'',
				noncestr:'',
				package:'',
				partnerid:'',
				prepayid:'',
				sign:'',
				timestamp:''
			}
		},
		onLoad() {

		},
		methods: {
			async  getopenid(){
				var that = this;
				const loginRes   =  await  uni.login({
				  provider: 'weixin',
				  // success: async function (loginRes) {
				 //    console.log(loginRes);
					
				  // }
				});
				console.log('loginRes===',loginRes)
				const r = await that.$api.GetOpenId_work({code:loginRes[1].code});
				console.log('r=====================',r)
				if(r.data.Status == 1){
					this.openId=r.data.Data.openId
					
				}else{
					uni.showToast({
						title:r.data.Memo,
						icon:'none'
					})
				}
				this.wepay()
			},
			async wepay(){
				var that = this;
				const r = await this.$api.WeChatPay_work({
					userId:uni.getStorageSync('userInfo').user_id,
					openId:that.openId
				})
				console.log('r============',r)
				if(r.data.Status == 1){
						
					this.appid = r.data.Data.appid
					this.noncestr=r.data.Data.noncestr
					this.package=r.data.Data.package
					this.partnerid=r.data.Data.partnerid
					this.prepayid=r.data.Data.prepayid
					this.sign=r.data.Data.sign
					this.timestamp= '' +　r.data.Data.timestamp
					this.payHandler()
				}else{
					uni.showToast({
						title:r.data.Memo,
						icon:'none'
					})
				}
			},
			// 支付按钮点击方法
			payHandler () {
				
				 console.log(3333)
				// await  this.wepay()
				uni.req
				var that = this;
				console.log('=======',that.paySign)
				// #ifdef MP-WEIXIN
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: 'orderInfo', // 订单数据
					timeStamp: '' + that.timestamp, // 时间戳从1970年1月1日至今的秒数，即当前的时间
					nonceStr:  that.noncestr, // 随机字符串，长度为32个字符以下
					package:  'prepay_id=' + that.prepayid, // 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx
					signType: 'MD5', //签名算法，暂支持 MD5
					paySign: that.sign, // 签名
					success: function (res) {
						// 支付成功的回调中 创建绘本馆成功
						uni.showToast({
							title: '微信支付成功',
							icon: 'success',
							duration: 1500
						});
					},
					fail: function (err) {
						// 支付失败的回调中 用户未付款
						console.log('err===========',err)
						uni.showToast({
							title: '支付取消',
							duration: 1500,
							image: '/static/png/error_icon.png'
						});
					}
				});
				// #endif
				// #ifdef MP-ALIPAY
				uni.requestPayment({
					provider: 'alipay',
					orderInfo: '', // 订单数据
					success: function (res) {
						if (res.resultCode == 6001) {
							uni.showToast({
								title: '支付取消',
								icon: 'none',
								duration: 1500
							});
						} else {
							uni.showToast({
								title: '支付宝支付成功',
								icon: 'success',
								duration: 1500
							});
						}
					},
					fail: function (err) {
						// 支付失败的回调中 用户未付款
						uni.showToast({
							title: '支付取消',
							duration: 1500,
							icon: 'none'
						});
					}
				});
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	.content {
		position: absolute;
		top: 0upx;
		left: 0upx;
		bottom: 0upx;
		right: 0upx;
		display: flex;
		align-items: center;
		justify-content: center;
		
		.pay-btn {
			/*  #ifdef  MP-WEIXIN  */
			background-color: #86db48;
			/*  #endif  */
			/*  #ifdef  MP-ALIPAY  */
			background-color: #3296fa;
			/*  #endif  */
			width: 600upx;
			height: 90upx;
			border-radius: 45upx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.title {
				font-size: 18px;
				color: #fff;
				margin-left: 20upx;
			}
			
			.iconfont {
				color: #fff;
			}
		}
	}
</style>
