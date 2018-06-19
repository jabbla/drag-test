<template>
<el-container>
    <el-aside
        width="200px"
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
            id="targetArea"
            class="m-dragable-target-area"
            ref="targetArea"
            @dragenter="handleEnter($event)"
            @dragover="handleOver($event)"
            @dragleave="handleLeave($event)"
            @drop="handleDrop($event)"
            @mouseover="handleMouseOver($event)"
        >
            <div class="m-tools-bar">
                <el-button 
                    type="text"
                    @click="handleCheckCode($event)"
                >
                    查看模块代码
                </el-button>
            </div>
        </div>
        <el-dialog class="editor-wraper" :fullscreen="true" title="模块代码" :visible.sync="dialogTableVisible">
            <div>
                <textarea class="editor" cols="30" rows="10" v-model="code">
                </textarea>
                <el-button 
                    type="primary"
                    @click="submitCode($event)"
                >
                    确认修改
                </el-button>
            </div>
        </el-dialog>
    </el-main>
</el-container>
</template>

<script>
import DragableFactory from '../../lib/DragableFactory.js';
import Dragable from '../../lib/Dragable.js';
import DragTargetArea from '../../lib/DragTargetArea.js';

export default {
  name: 'ContructPage',
  props: ['dragableInfoList'],
  data(){
    return {
        dialogTableVisible: false,
        code: ''
    };
  },
  mounted(){
      let targetArea = this.$refs.targetArea;

      this._dragTargetArea = new DragTargetArea({dom: targetArea});
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
        if(e.target !== this.$refs.targetArea){
            return;
        }
        let {dataTransfer} = event;
        let id = dataTransfer.getData('Text');
        let dragable = Dragable.getDragableById(id);

        this._dragTargetArea.putDragable(dragable);
        e.preventDefault();
      },
      handleMouseOver(e){
      },
      handleCheckCode(e){
          this.dialogTableVisible = true;
          this.code = this._dragTargetArea.generateCode();
      },
      submitCode(e){
          this._dragTargetArea.decode(this.code);
          this.dialogTableVisible = false;
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
    position: relative;
    min-height: 500px;
}
.m-tools-bar {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
}
.editor {
    width: calc(100% - 40px);
    height: 500px;
}
</style>
