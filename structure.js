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
    projectConfig: {},          //工程相关配置
    name: 'customElement',      //全局名称
    scopedName: 'scopedName',   //局部注册的组件名称
    props: [                    //外部数据接口
        {
            name: 'propName',   //prop名称
            value: 'propValue', //prop值字符串
        }
    ],
    data: [                     //内部默认数据
        {
            name: '',           //属性
            value: '',          //属性值字符串
        }
    ],
    children: [],               //可以包括，module，component，htmlNode
    events: [
        {
            type: 'click',      //事件名称
            handler: 'function(){}' //事件处理函数字符串
        }
    ],
    lifecCycles: [              //生命周期
        {
            type: 'config',
            name: 'config',
            handler: 'function(){}'
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

/**page*/
var page = {
    type: 'page',
    name: 'pageName',           //页面名称
    rootElem: '#app',           //根组件挂载的元素
    rootComponent: {...component},  //根组件相关信息
    children: []                //可以包括，module，component，htmlNode
};

module.exports = {page, module, component, htmlNode};