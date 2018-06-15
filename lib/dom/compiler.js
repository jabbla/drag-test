class compiler {
    constructor(ast){
        this.ast = ast;
    }
    run(){
        this._dom = this.compile(this.ast);

        return this._dom;
    }
    compile(node){
        let dom;

        switch(node.nodeType){
            case 'element': dom = this.element(node); break;
            case 'text': dom = this.text(node); break;
        }
        return dom;
    }
    element(node){
        let {tagName, attrs, children} = node;

        let dom = document.createElement(tagName);
        
        attrs.forEach(attr => {
            dom.setAttribute(attr.name, attr.value);
        });

        children.forEach(childNode => {
            dom.appendChild(this.compile(childNode));
        });

        return dom;
    }
    text(node){
        return document.createTextNode(node.text);
    }
}



export default compiler;