export default {
    name: 'myBlog',
    types: [
        {
            type: 'object',
            name: 'blogPost',
            fields: [
                {
                    title: 'Title',
                    type: 'string',
                    name: 'title',
                },
                {
                    title: 'Body',
                    name: 'body',
                    type: 'array',
                    of: [{ type: 'block' }],
                },
            ],
        },
    ],
}