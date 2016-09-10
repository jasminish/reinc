// tag.js
// The set of tags available.
module.exports = {
    attributes: {
        brand: {
            type: 'string',
            enum: ['Gilette', 'head & shoulders', 'Lenor', 'Pampers'],
            required: true,
        },
        post: {
            model: 'post',
        }
    }
}
