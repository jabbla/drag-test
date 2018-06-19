import Vue from 'vue';
import EventEmitter from 'wolfy87-eventemitter';
import compiler from './dom/compiler.js';

import './dom/effects.css';

let CLICK_FOCUS_STATE = 'click-focus';
let INIT_STATE = 'fixed-dragable';
let DRAG_ENTER_STATE = 'drag-enter';

class FixedDragable extends EventEmitter {
    constructor(dragable){
        super();
        this._dragable = dragable;
        this._dom = dragable.getDom();
        this._info = this._cloneDragableInfo(dragable);

        this._setInitState();
        this._addListeners();
    }
    _addListeners(){
        const {_dom} = this;

        _dom.addEventListener('click', this._handleClick.bind(this));
        _dom.addEventListener('dragenter', this._handleDragenter.bind(this));
        _dom.addEventListener('dragleave', this._handleDragleave.bind(this));
        _dom.addEventListener('drop', this._handleDrop.bind(this));
        window.addEventListener('click', this._hideFocusState.bind(this));
    }
    getDom(){
       return this._dom; 
    }
    generateCode(index){
        let {_info} = this;

        return new compiler({..._info, index}).code();
    }
    update(newDom){
        this._updateAttrs(newDom);
        this._updateChilds(newDom);
    }
    _updateChilds(newDom){
        let {_dom} = this;

        _dom.innerHTML = newDom.innerHTML;
    }
    _updateAttrs(newDom){
        let {_dom} = this;

        let newAttrNames = newDom.getAttributeNames();
        let oldAttrNames = _dom.getAttributeNames();
        let attrNamesMap = {};

        newAttrNames.reduce((prev, cur) => {
            prev[cur] = newDom.getAttribute(cur);
            return prev;
        }, attrNamesMap);

        oldAttrNames.reduce((prev, cur) => {
            prev[cur] = _dom.getAttribute(cur);
            return prev;
        }, attrNamesMap);

        for(let attrName in attrNamesMap){
            _dom.setAttribute(attrName, attrNamesMap[attrName]);
        }
    }
    _cloneDragableInfo(dragable){
        let {_info} = dragable;

        return JSON.parse(JSON.stringify(_info));
    }
    _FocusState(){
        const {_dom} = this;

        _dom.classList.add(CLICK_FOCUS_STATE);

        this._setFocusWraper();
    }
    _EnterState(){
        const {_dom} = this;

        _dom.classList.add(DRAG_ENTER_STATE);
    }
    _HideFocusState(){
        const {_dom, _clickFocusWraper} = this;
        
        _dom.classList.remove(CLICK_FOCUS_STATE);
        _dom.contains(_clickFocusWraper) && _dom.removeChild(_clickFocusWraper);
    }
    _HideEnterState(){
        const {_dom} = this;

        _dom.classList.remove(DRAG_ENTER_STATE);
    }
    _setInitState(){
        const {_dom} = this;

        _dom.classList.add(INIT_STATE);
    }
    _setFocusWraper(){
        const {_dom} = this;
        const self = this;

        let wraper = this._clickFocusWraper = this._clickFocusWraper || document.createElement('span');

        wraper.className = 'click-focus-wraper';
        Object.assign(wraper.style, {
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0'
        });

        const button = this._wraperVueInstance = this._wraperVueInstance || new Vue({
            methods: {
                deleteFixedDragable(){
                    this.$confirm('确定将该模块从布局中删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        self.emit('delete', self);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                },
                setFixesDragable(){
                    const setDialog = new Vue({
                        data: {
                            visible: true
                        },
                        methods: {
                            onClose(){
                                this.visible = false;
                                this.$nextTick(() => {
                                    document.body.removeChild(this.$el);
                                });
                            }
                        },
                        render(){
                            return (
                                <el-dialog
                                    title="设置"
                                    visible={this.visible}
                                    onClose={this.onClose}
                                >
                                    <el-form model={this.form}>
                                        <el-form-item 
                                            label="活动名称" 
                                            label-width={this.formLabelWidth}
                                        >
                                            <el-input v-model="form.name" auto-complete="off"></el-input>
                                        </el-form-item>
                                    </el-form>
                                </el-dialog>
                            );
                        }
                    }).$mount();

                    document.body.appendChild(setDialog.$el);
                }
            },
            render(){
                return (
                    <div>
                        <el-button 
                            class="delete-fixed-btn"
                            size="mini"
                            type="danger"
                            onClick={this.deleteFixedDragable}
                        >
                        删除
                        </el-button>
                        <el-button 
                            class="set-fixed-btn"
                            size="mini"
                            type="primary"
                            onClick={this.setFixesDragable}
                        >
                        设置
                        </el-button>
                    </div>
                );
            }
        }).$mount();

        !wraper.contains(button.$el) && wraper.appendChild(button.$el);

        _dom.appendChild(wraper);        
    }
    _handleClick(){
        this._FocusState();
    }
    _hideFocusState(e){
        const {_dom} = this;

        if(!_dom.contains(e.target)){
            this._HideFocusState();
        }
    }
    _handleDragenter(){
        this._EnterState();
    }
    _handleDragleave(){
        this._HideEnterState();
    }
    _handleDrop(e){
        this._HideEnterState();
        this._confirmTargetPosition(e);
    }
    _confirmTargetPosition(e){
        const self = this;
        const TargetArea = document.getElementById('targetArea');
        const dragableId = e.dataTransfer.getData('Text');
        const ConfirmDialog = new Vue({
            data: {
                visible: true
            },
            methods: {
                close(){
                    this.visible = false;
                    this.$destroy();
                },
                before(){
                    self.emit('insert-before', dragableId);
                    this.close();
                },
                after(){
                    self.emit('insert-after', dragableId);
                    this.close();
                }
            },
            render(){
                let {visible} = this;
                return (
                    <el-dialog
                        title="选择插入位置"
                        visible={visible}
                        onClose={this.close}
                        append-to-body
                    >
                        <el-button onClick={this.before}>目标模块前</el-button>
                        <el-button onClick={this.after}>目标模块后</el-button>
                    </el-dialog>
                )
            }
        }).$mount();

        TargetArea.appendChild(ConfirmDialog.$el);
    }
}

export default FixedDragable;