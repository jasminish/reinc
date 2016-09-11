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
                record.posts.add(post)
                record.save()
                Post.create(post, function(err, obj){
                    if (err){
                        return res.serverError(err)
                    } else {
                        obj.upvote = 0
                        obj.tags.add(record.id)
                        obj.save()
                        res.status(201)
                        res.json(obj)
                    }
                })
            }
        )
    },

    upvote: function(req, res){
        var id = req.param('id')
        Post.findOne({id: id}).exec(
            function(err, record){
                if (err) return res.serverError(err)
                if (!record) return res.notFound('Invalid id entered')
                record.upvote += 1
                record.save()
                res.status(201)
                res.json(record)
            }
        )
    },
};
