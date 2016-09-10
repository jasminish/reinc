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
        Tag.findOrCreate({brand: post.brand}, 
                        {brand: post.brand}).
                        then(
            function(record){
                record.posts.add(post.id)
                record.save()
                post.tag = record.id
                Post.create(post, function(err, obj){
                    if (err){
                        return res.serverError(err)
                    } else {
                        res.status(201)
                        res.json(obj)
                    }
                })
            }
        )
    },
	
};

