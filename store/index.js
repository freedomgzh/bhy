import Vue from 'vue'
import Vuex from 'vuex'
import user from "./store.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	  modules:{
		   user:user
		   
      }
})

export default store
