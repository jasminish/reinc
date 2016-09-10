/**
 * Post.js
 *
 * @description :: the post model represents a user's post
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        title: {
            type: 'string',
            required: true,
        },
        /*
        picture: {
            model: 'picture'
        },
        */
        author: {
            model: 'user',
            required: true,
        },
        content: {
            type: 'string',
            required: false,
        },
    }

};

