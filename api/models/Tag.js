// tag.js
// The set of tags available.
module.exports = {
    attributes: {
        brand: {
            type: 'string',
            enum: ['gilette', 'head_and_shoulders', 'lenor', 'pampers'],
            required: true,
        },
        posts: {
            collection: 'post',
            via: 'tags',
        }
    }
}
