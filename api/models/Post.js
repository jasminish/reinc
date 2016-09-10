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
            required: true
        },
        /*
        picture: {
            model: 'picture'
        },
        */
        author: {
            model: 'user',
            unique: true,
            required: true
        },
        content: {
            type: 'string'
            required: true
        },
        toJson: function(){
            var obj = this.toObject();
            return obj;
        },
    }

};

