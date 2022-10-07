import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/index.js'
import store from './store/index.js'
import BaseLoader from './components/BaseLoader.vue'

Vue.config.productionTip = false

Vue.component("base-loader",BaseLoader)

new Vue({
  vuetify,
  render: h => h(App),
  router,
  store
}).$mount('#app')
