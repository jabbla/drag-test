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
        
        this.putFixedDragable(fixedDragable);
    }
    putFixedDragable(fixedDragable){
        const {_dom: targetArea} = this;

        this._fixedDragables.push(fixedDragable);
        targetArea.appendChild(fixedDragable.getDom());

    }
}

export default DragTargetArea;