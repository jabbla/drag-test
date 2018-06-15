import NormalDragableFactory from './NormalDragableFactory.js';

class DragableFactory {
    constructor(){

    }
    static make(dragableInfo){
        let {type} = dragableInfo;
        const factory = type === 'element'? NormalDragableFactory : null;

        if(!factory){
            //error
            return;
        }

        return new factory().make(dragableInfo);
    }
}

export default DragableFactory;