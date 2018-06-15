import compiler from './dom/compiler.js';

let currentId = 0;
let dragableList = [];

class Dragable {
    constructor(info){
        this._info = info;
        this.name = info.name;
        this.thumbnail = this.createThumbnail();

        Dragable.setId(this);
        Dragable.saveDragable(this);
    }
    createThumbnail(){
        return this.getDom();
    }
    getDom(){
        return new compiler(this._info).run();
    }
    static getDragableById(id){
        return dragableList[id];
    }
    static saveDragable(dragable){
        dragableList.push(dragable);
    }
    static setId(dragable){
        dragable.id = currentId++;
    }
}

export default Dragable;