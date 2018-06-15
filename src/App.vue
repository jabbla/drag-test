<template>
  <div id="app">
    <el-container>
      <el-header class="m-nav">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          :default-active="currentMenuIndex"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">搭建页面</el-menu-item>
          <el-menu-item index="2">管理可复用模块</el-menu-item>
        </el-menu>
      </el-header>
      <ContructPage v-bind:dragableInfoList="dragableInfoList" v-if="showCurrentPage"></ContructPage>
    </el-container>
  </div>
</template>

<script>
import ContructPage from './components/ContructPage.vue'

export default {
  name: 'app',
  props: ['dragableInfoList'],
  data(){
    return {
      currentMenuIndex: '1'
    };
  },
  computed: {
    showCurrentPage(){
      return this.currentMenuIndex === '1';
    }
  },
  components: {
    ContructPage
  }
}
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.m-nav {
  padding: 0;
}
</style>
