<template>
	<view class="content">
		
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
				console.log('r====',r)
			}
		},
		onLoad(e) {
			const orderId = e.id
			this.getList(orderId)
		}
	}
</script>

<style>

</style>
