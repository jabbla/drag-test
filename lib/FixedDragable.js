import Vue from 'vue';
import EventEmitter from 'wolfy87-eventemitter';

import './dom/effects.css';

let CLICK_FOCUS_STATE = 'click-focus';
let INIT_STATE = 'fixed-dragable';
let DRAG_ENTER_STATE = 'drag-enter';

class FixedDragable extends EventEmitter {
    constructor(dragable){
        super();
        this._dragable = dragable;
        this._dom = dragable.getDom();
        
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
    _FocusState(){
        const {_dom} = this;

        _dom.classList.add(CLICK_FOCUS_STATE);

        this._setFocusWraper();
    }
    _HideFocusState(){
        const {_dom, _clickFocusWraper} = this;
        
        _dom.classList.remove(CLICK_FOCUS_STATE);
        
        _dom.contains(_clickFocusWraper) && _dom.removeChild(_clickFocusWraper);
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
                        self.emitEvent('delete', self);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        }); 
                    });
                }
            },
            render(){
                return (
                    <el-button 
                        class="delete-fixed-btn"
                        size="mini"
                        type="danger"
                        onClick={this.deleteFixedDragable}
                    >
                    删除
                    </el-button>
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
        const {_dom} = this;

        _dom.classList.add(DRAG_ENTER_STATE);
    }
    _handleDragleave(){
        const {_dom} = this;

        _dom.classList.remove(DRAG_ENTER_STATE);
    }
    _handleDrop(){
        const {_dom} = this;

        _dom.classList.remove(DRAG_ENTER_STATE);
    }
}

export default FixedDragable;