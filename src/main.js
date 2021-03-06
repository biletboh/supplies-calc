import Vue from 'vue'
import App from './App.vue'
import VueClipboard from 'vue-clipboard2'
import VueScrollTo from 'vue-scrollto'
import VueMeta from 'vue-meta'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faFacebookSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { faDivide, faTimes, faList, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


require('./../node_modules/bulma/css/bulma.css');
require('./assets/css/main.css');


Vue.config.productionTip = false

Vue.use(VueClipboard)
Vue.use(VueMeta)
Vue.use(VueScrollTo, {
     container: "body",
     duration: 500,
     easing: "ease",
     offset: -24,
     force: true,
     cancelable: true,
     onStart: false,
     onDone: false,
     onCancel: false,
     x: false,
     y: true
 })


library.add(
  faGithub,
  faFacebookSquare,
  faTwitterSquare,
  faDivide,
  faTimes,
  faPlus,
  faList
)


Vue.component('font-awesome-icon', FontAwesomeIcon)


new Vue({
  render: h => h(App),
}).$mount('#app')
