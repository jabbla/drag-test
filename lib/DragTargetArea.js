import FixedDragableFactory from './FixedDragableFactory.js';
import Dragable from './Dragable.js';
import beautify from 'js-beautify';

class DragTargetArea {
    constructor(options){
        this._dom = options.dom;
        this._fixedDragables = [];
        this._fixedDragableFactory = new FixedDragableFactory();
    }
    putDragable(dragable, insertOption){
        const {_fixedDragableFactory} = this;
        let fixedDragable = _fixedDragableFactory.make(dragable);
        
        this._putFixedDragable(fixedDragable, insertOption);
    }
    generateCode(){
        let {_fixedDragables} = this;
        let codeStr = _fixedDragables.reduce((prev, cur, index) => {
            prev += `${cur.generateCode(index)}`;
            return prev;
        }, '');

        return beautify.html(codeStr);
    }
    decode(code){
        let tempDom = document.createElement('div');

        tempDom.innerHTML = code;

        let children = [...tempDom.children];

        children.forEach(child => {
            let fixedDragableIndex = child.dataset.fixedDragableIndex;
            let fixedDragable = this._fixedDragables[fixedDragableIndex];

            fixedDragable.update(child);
        });
    }
    removeFixedDragable(fixedDragable){
        let {_fixedDragables, _dom} = this;

        let index = _fixedDragables.indexOf(fixedDragable);
        _fixedDragables.splice(index, 1);

        _dom.removeChild(fixedDragable._dom);
    }
    insertBeforeFixedDragable(params){
        let {_fixedDragables} = this;
        let {fixedDragable, dragableId} = params;
        
        let index = _fixedDragables.indexOf(fixedDragable);
        let dragable = Dragable.getDragableById(dragableId);

        this.putDragable(dragable, {type: 'before', index: index});
    }
    insertAfterFixedDragable(params){
        let {_fixedDragables} = this;
        let {fixedDragable, dragableId} = params;
        
        let index = _fixedDragables.indexOf(fixedDragable);
        let dragable = Dragable.getDragableById(dragableId);

        this.putDragable(dragable, {type: 'after', index: index});
    }
    _putFixedDragable(fixedDragable, insertOption){
        this._listenFixedDragable(fixedDragable);
        this._insertFixedDragable(fixedDragable, insertOption);
    }
    _insertFixedDragable(fixedDragable, insertOption){
        const {_dom: targetArea} = this;

        if(!insertOption){
            this._fixedDragables.push(fixedDragable);
            targetArea.appendChild(fixedDragable.getDom());
            return;
        }

        let {type, index} = insertOption;
        let position = type === 'before'? index : (type === 'after'? index + 1 : undefined);

        if(typeof position === 'undefined'){
            throw new Error('发生错误');
        }

        const referFixed = this._fixedDragables[position];
        const reference = referFixed && referFixed.getDom();
        const newFixedDom = fixedDragable.getDom();

        this._fixedDragables.splice(position, 0, fixedDragable);
        referFixed? targetArea.insertBefore(newFixedDom, reference) : targetArea.appendChild(newFixedDom);
    }
    _listenFixedDragable(fixedDragable){
        fixedDragable.addListener('delete', this.onDeleteFixedDragable(fixedDragable));
        fixedDragable.addListener('insert-before', this.onInsertBeforeFixedDragable(fixedDragable))
        fixedDragable.addListener('insert-after', this.onInsertAfterFixedDragable(fixedDragable))
    }
    onDeleteFixedDragable(fixedDragable){
        return () => {
            this.removeFixedDragable(fixedDragable);
        };
    }
    onInsertBeforeFixedDragable(fixedDragable){
        return (dragableId) => {
            this.insertBeforeFixedDragable({fixedDragable, dragableId});
        };
    }
    onInsertAfterFixedDragable(fixedDragable){
        return (dragableId) => {
            this.insertAfterFixedDragable({fixedDragable, dragableId});
        };
    }
}

export default DragTargetArea;