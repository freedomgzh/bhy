
<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			  const { model, system, statusBarHeight } = uni.getSystemInfoSync()
			    let headHeight
			    if (/iphone\s{0,}x/i.test(model)) {
			      headHeight = 88
			    } else if (system.indexOf('Android') !== -1) {
			      headHeight = 68
			    } else {
			      headHeight = 64
			    } 
				Vue.prototype.$headerHeight  = headHeight
				Vue.prototype.$statusBarHeight  = statusBarHeight
			 //    Vue.prototype.$headerHeight = headHeight
				// Vue.prototype.$statusBarHeight = statusBarHeight
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/*每个页面公共css */
	/*每个页面公共css */
	.flex {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}
	
	.flexRow {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: horizontal;
		flex-direction: row;
	}
	
	.flexCol {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: vertical;
		flex-direction: column;
	}
	
	.flex-grow-0 {
		min-width: 0;
		-webkit-box-flex: 0;
		-ms-flex-positive: 0;
		flex-grow: 0;
		-ms-flex-negative: 0;
		flex-shrink: 0;
	}
	
	.flex-grow-1 {
		min-width: 0;
		-webkit-box-flex: 1;
		-ms-flex-positive: 1;
		flex-grow: 1;
		-ms-flex-negative: 1;
		flex-shrink: 1;
	}
	
	.flex-grow-2 {
		min-width: 0;
		-webkit-box-flex: 2;
		-ms-flex-positive: 2;
		flex-grow: 2;
		-ms-flex-negative: 2;
		flex-shrink: 2;
	}
	
	.flexXc {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
	}
	
	.flexXb {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: space-between;
		-ms-flex-pack: space-between;
		justify-content: space-between;
	}
	
	.flexXa {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: space-around;
		-ms-flex-pack: space-around;
		justify-content: space-around;
	}
	
	.flexYc {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-ms-grid-row-align: center;
		align-items: center;
	}
	
	.flexYb {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: space-between;
		-ms-flex-align: space-between;
		-ms-grid-row-align: space-between;
		align-items: space-between;
	}
	
	.flexYe {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: end;
		-ms-flex-align: end;
		-ms-grid-row-align: flex-end;
		align-items: flex-end;
	}
	
	.flexXrr {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: horizontal;
		flex-direction: row-reverse;
	}
	
	.flexXcr {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: horizontal;
		flex-direction: column-reverse;
	
	}
	
	.text_1 {
		overflow: hidden;
		/*超出部分隐藏*/
		white-space: nowrap;
		/*不换行*/
		text-overflow: ellipsis;
		/*超出部分文字以...显示*/
	
	}
	.shadowAll{
		box-shadow:  -2px 0px 5px 1px #e2e2e2,0px -2px 5px 1px #e2e2e2,2px 0px 5px 1px #e2e2e2,0px 2px 5px 1px #e2e2e2; 
	
	}
</style>
