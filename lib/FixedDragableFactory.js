import FixedDragable from './FixedDragable.js';

class FixedDragableFactory {
    constructor(){
        
    }
    make(dragable){
        return new FixedDragable(dragable);
    }
}

export default FixedDragableFactory;