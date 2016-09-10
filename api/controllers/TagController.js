/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function(req, res){
        var post = req.params.all()
        post.author = req.user
        var tag = Tag.findOne({brand: post.brand}).exec(
            function(err, t){
                if (err){
                    return res.serverError(err)
                } 
                if (!t) { 
                    // if tag is not found
                    // create the tag
                    var new_tag = {
                        brand: post.brand,
                        posts: [post]
                    }
                    return Tag.create(new_tag, function(err, obj){
                        if (err){
                            return res.serverError(err)
                        } else {
                            return obj
                        }
                    })
                } else {
                    return t
                }
            }
        )
        post.tag = tag
        Post.create(post, function(err, obj){
            if (err){
                return res.serverError(err)
            } else {
                res.status(201)
                res.json(obj)
            }
        })
    },
	
};

