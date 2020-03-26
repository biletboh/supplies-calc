import Vue from 'vue'
import App from './App.vue'
import VueClipboard from 'vue-clipboard2'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faDivide, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


require('./../node_modules/bulma/css/bulma.css');
require('./assets/css/main.css');

library.add(
  faGithub,
  faDivide,
  faTimes
)


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(VueClipboard)


new Vue({
  render: h => h(App),
}).$mount('#app')
