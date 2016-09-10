/**
 * Post.js
 *
 * @description :: the post model represents a user's post
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        title: {
            type: 'string'
        },
        picture: {
            model: 'picture'
        },
        author: {
            model: 'user',
            unique: true
        },
        content: {
            type: 'string'
        },
    }

};

