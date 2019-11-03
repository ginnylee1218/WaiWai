import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';

import { vsInputNumber, vsIcon } from 'vuesax';
import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';

import VeeValidate from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW';
import VueI18n from 'vue-i18n';

import Lingallery from 'lingallery';
import VueAwesomeSwiper from 'vue-awesome-swiper';
require('swiper/dist/css/swiper.css');

import App from './App.vue'
import router from './router'
import store from './store';
import Pagination from '@/components/Pagination.vue';
import currencyFilter from '@/filters/currency';
import dateFilter from '@/filters/date';
// import './bus';


Vue.config.productionTip = false //阻止啟動生產消息

Vue.use(VueAxios, axios);
Vue.use(Vuex);

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zhTW'
});
Vue.use(VeeValidate, {
  events: 'input|blur',
  i18n,
  dictionary: {
    zhTW
  }
});

Vue.use(vsInputNumber);
Vue.use(vsIcon);
Vue.use(VueAwesomeSwiper)


Vue.component('Loading', Loading);
Vue.component('Pagination', Pagination);
Vue.component('lingallery', Lingallery);
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

//打開cookie
axios.defaults.withCredentials = true;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')


router.beforeEach((to, from, next) => {
  //console.log('to',to,'from',from)
  if (to.meta.requiresAuth) {
    //需要驗證
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((response) => {
      //console.log(response.data)
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/'
        })
      }
    })
  } else {
    next();
  }
})

// This variable will hold the reference to
// document's click handler
let handleOutsideClick;
Vue.directive('closable', {
  bind(el, binding, vnode) {
    // Here's the click/touchstart handler
    // (it is registered below)
    handleOutsideClick = (e) => {
      e.stopPropagation()
      // Get the handler method name and the exclude array
      // from the object used in v-closable
      const { handler, exclude } = binding.value

      // This variable indicates if the clicked element is excluded
      let clickedOnExcludedEl = false
      exclude.forEach(refName => {
        // We only run this code if we haven't detected
        // any excluded element yet
        if (!clickedOnExcludedEl) {
          // Get the element using the reference name
          const excludedEl = vnode.context.$refs[refName]
          // See if this excluded element
          // is the same element the user just clicked on
          clickedOnExcludedEl = excludedEl.contains(e.target)
        }
      })

      // We check to see if the clicked element is not
      // the dialog element and not excluded
      if (!el.contains(e.target) && !clickedOnExcludedEl) {
        // If the clicked element is outside the dialog
        // and not the button, then call the outside-click handler
        // from the same component this directive is used in
        vnode.context[handler]()
      }
    }
    // Register click/touchstart event listeners on the whole page
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
  },

  unbind() {
    // If the element that has v-closable is removed, then
    // unbind click/touchstart listeners from the whole page
    document.removeEventListener('click', handleOutsideClick)
    document.removeEventListener('touchstart', handleOutsideClick)
  }
})