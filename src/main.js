import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'

import dragableInfoList from '../storage/dragableInfoList';

Vue.use(ElementUI);



Vue.config.productionTip = false

new Vue({
  render(){
    
    return (
      <App dragableInfoList={dragableInfoList}></App>
    );
  }
}).$mount('#app')
