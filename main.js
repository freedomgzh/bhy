import Vue from 'vue'
import App from './App'
import store from './store'
import api from './common/vmeitime-http/index.js'
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
