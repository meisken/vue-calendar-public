import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import 'font-awesome/css/font-awesome.css'
import AOS from "aos";
import "aos/dist/aos.css";

import touch from 'vue-directive-touch';
Vue.use(touch);

Vue.filter("plusZero",val => {
  if(val < 10){
    return '0' + val.toString();
  }
  return  val;
});

/*
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)
*/
export const bus = new Vue();
Vue.config.productionTip = false;



let app;
firebase.auth().onAuthStateChanged(() => {

  if(!app){
    app = new Vue({
 
      created() {
        AOS.init({});
      },
      router,
      store,
      render: h => h(App)
    }).$mount('#app');

  }
})


