import Dragable from './Dragable.js';

class NormalDragableFactory {
    constructor(){

    }
    make(dragableInfo){
        let {type} = dragableInfo;
        if(type !== 'element'){
            //error
            return;
        }

        return new Dragable(dragableInfo);
    }
}

export default NormalDragableFactory;