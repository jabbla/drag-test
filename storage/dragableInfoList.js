export default [
    {
        type: 'element',
        name: '段落1',
        id: 0,
        tagName: 'p',
        nodeType: 'element',
        attrs: [
            {name: 'class', value: 'test-p'},
            {name: 'id', value: 'testP'},
            {name: 'style', value: 'color: red'}
        ],
        children: [
            {
                nodeType: 'text',
                text: '一个段落元素1'
            }
        ]
    },
    {
        type: 'element',
        name: '段落2',
        id: 1,
        tagName: 'p',
        nodeType: 'element',
        attrs: [
            {name: 'class', value: 'test-p'},
            {name: 'id', value: 'testP'},
            {name: 'style', value: 'color: red'}
        ],
        children: [
            {
                nodeType: 'text',
                text: '一个段落元素2'
            }
        ]
    }
];