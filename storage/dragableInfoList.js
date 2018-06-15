export default [
    {
        type: 'element',
        name: '段落',
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
                text: '一个段落元素'
            }
        ]
    }
];