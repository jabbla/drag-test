import FixedDragableFactory from './FixedDragableFactory.js';

class DragTargetArea {
    constructor(options){
        this._dom = options.dom;
        this._fixedDragables = [];
        this._fixedDragableFactory = new FixedDragableFactory();
    }
    putDragable(dragable){
        const {_fixedDragableFactory} = this;
        let fixedDragable = _fixedDragableFactory.make(dragable);
        
        this._putFixedDragable(fixedDragable);
    }
    removeFixedDragable(fixedDragable){
        let {_fixedDragables, _dom} = this;

        let index = _fixedDragables.indexOf(fixedDragable);
        _fixedDragables.splice(index, 1);

        _dom.removeChild(fixedDragable._dom);
    }
    _putFixedDragable(fixedDragable){
        const {_dom: targetArea} = this;

        this._listenFixedDragable(fixedDragable);
        this._fixedDragables.push(fixedDragable);
        targetArea.appendChild(fixedDragable.getDom());
    }
    _listenFixedDragable(fixedDragable){
        fixedDragable.addListener('delete', this.onDeleteFixedDragable(fixedDragable));
    }
    onDeleteFixedDragable(fixedDragable){
        return () => {
            this.removeFixedDragable(fixedDragable);
        };
    }
}

export default DragTargetArea;