export default {
	state: {
		hasLogin: uni.getStorageSync('userInfo') ? true : false, //登陆状态
		loginProvider: "", //登陆方式 如 微信
		openid: null, //应用id
		address: {}, //收货地址
		userinfo: {
			realname: "未登录",
			avatar: "../../static/me/logo.png",
			user_id: "",
			mobile: "未登录",
			tutor_name: '未登录',
			address: "北京市西城区中南海大院1号",
			sex: "男",
			area: "北京-北京-东城区"
		} //用户信息
	},
	getters: {
		userinfo(state) {
			return state.userinfo;
		},
		login(state) {
			return state.hasLogin;
		},
		address(state) {
			return state.address;
		},
		hasLogin(state) {
			return state.hasLogin
		}
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.loginProvider = provider;
		},
		logout(state) {
			state.hasLogin = false
			state.openid = null
		},
		setUserinfo(state, userinfo) {
			state.hasLogin = true;
			state.userinfo = userinfo;
		}
	},
	actions: {
	
		isLoginGet: async function(context) {
			var that = this
			console.log(11111)
			return await new Promise((resolve, reject) => {
				var hasLogin = uni.getStorageSync('userInfo') ? true : false;
				
				console.log('============',that)
					if(hasLogin){
						global.api.userinfo({user_id:uni.getStorageSync('userInfo').user_id},function(data){
							console.log(1111111,data)
							uni.setStorageSync('userInfo',data)
							context.commit('setUserinfo', data)
						})
						
					}
					
					

				// console.log('context======',context)
				if (!hasLogin) {


					resolve(false)
				} else {


					resolve(true)
				}
			})


		},
		isLogin: async function(context) {
			console.log('context======',context)
			return await new Promise((resolve, reject) => {
				var hasLogin = uni.getStorageSync('userInfo') ? true : false;
				hasLogin && context.commit('setUserinfo', uni.getStorageSync('userInfo'))
				
				if (!hasLogin) {
					
					
					resolve(false)
				} else {


					resolve(true)
				}
			})

		}
	}
}
