import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

Vue.config.productionTip = false
new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app')

Vue.use(VueToast);
