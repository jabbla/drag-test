<template>
<el-container>
    <el-aside
        width="300px"
        class="m-dragable-aside"
    >
        <h3 class="m-dragable-list-title">可拖拽列表</h3>
        <ul class="m-dragable-list">
            <li 
                class="m-dragable-item"
                :key="dragableItem.id"
                v-for="dragableItem in dragableList"
                draggable="true"
                @dragstart="handleStart($event, dragableItem)"
            >
                {{ dragableItem.name }}
            </li>
        </ul>
    </el-aside>
    <el-main>
        <div 
            class="m-dragable-target-area"
            ref="targetArea"
            @dragenter="handleEnter($event)"
            @dragover="handleOver($event)"
            @dragleave="handleLeave($event)"
            @drop="handleDrop($event)"
        >

        </div>
    </el-main>
</el-container>
</template>

<script>
import DragableFactory from '../../lib/DragableFactory.js';
import Dragable from '../../lib/Dragable.js';

export default {
  name: 'ContructPage',
  props: ['dragableInfoList'],
  data(){
    return {};
  },
  created(){
      this.dragableList = this.dragableInfoList.map(dragableInfo => DragableFactory.make(dragableInfo));
  },
  methods: {
      handleEnter(e){
          e.preventDefault();
      },
      handleOver(e){
          e.preventDefault();
      },
      handleLeave(e){
          e.preventDefault();
      },
      handleStart(e, dragableItem){
        let {dataTransfer} = event;
        
        dataTransfer.setData('Text', dragableItem.id);
      },
      handleDrop(e){
        let {dataTransfer} = event;
        let id = dataTransfer.getData('Text');
        let dragable = Dragable.getDragableById(id);


        this.$refs.targetArea.appendChild(dragable.getDom());
        e.preventDefault();
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.m-dragable-list-title {
    margin-top: 10px;
}
.m-dragable-aside {
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}
.m-dragable-target-area {
    height: 500px;
}
</style>
