/**与HTMLNode的类型一致 */
var htmlNode = {
    type: 'htmlNode',           //类型
    nodeType: 'ELEMENT_NODE',   //html节点类型：ELEMENT_NODE, ATTRIBUTE_NODE, TEXT_NODE...
    nodeName: 'div',            //节点名称，文本节点是#text
    childNodes: [],             //子节点
    events: [
        {
            type: 'click',      //事件类型：click点击事件
            handler: 'function(){}' //事件处理函数
        }
    ]
};

/**component */
var component = {
    type: 'component',
    name: 'customElement',      //为了兼容多种规范，先不做限制
    props: [                    //外部数据接口
        {
            name: 'propName',   //prop名称
            value: 'propValue', //prop值
        }
    ],
    children: [],               //可以包括，module，component，htmlNode
    events: [
        {
            type: 'click',      //事件类型：click点击事件
            handler: 'function(){}' //事件处理函数
        }
    ]
};

/**module */
var module = {
    type: 'module',
    name: 'moduleName',         //模块名称
    fields: [
        {
            type: 'number',     //字段类型
            name: 'fieldName',  //字段名称
            value: 0            //字段值
        }
    ],
    children: []                //可以包括，module，component，htmlNode
};

/**page */
var page = {
    type: 'page',
    name: 'pageName',           //页面名称
    children: []                //可以包括，module，component，htmlNode
};

module.exports = {page, module, component, htmlNode};