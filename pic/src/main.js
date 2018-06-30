// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
require('./css/base.css');
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  let sUserAgent = navigator.userAgent.toLowerCase();

  let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";

  let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";

  let bIsMidp = sUserAgent.match(/midp/i) == "midp";

  let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";

  let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";

  let bIsAndroid = sUserAgent.match(/android/i) == "android";

  let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";

  let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    if (!to.path.match('wap')) {
      if (to.path === '/') {
        router.push('/wap/home');
        next();
      } else {
        let path = to.path.replace('web', 'wap');
        router.push(path);
        next();
      }
    }
  }else{
    if (!to.path.match('web')) {
      if (to.path === '/') {
        router.push('/web/home');
        next();
      } else {
        let path = to.path.replace('wap', 'web');
        router.push(path);
        next();
      }
    }
  }
  next();
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
