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

        // upload picture
        req.file('picture').upload(function (err, files) {
            if (err) return res.serverError(err);

            if (files[0] !== undefined){
                var file = {
                    filename: files[0].filename
                    fileDescriptor: files[0].fd
                }
                post.picture = file
            }

            // find tag
            Tag.findOrCreate({brand: post.brand}, 
                            {brand: post.brand}).
                            then(
                function(tag){
                    tag.posts.add(post)
                    tag.save()

                    // create post
                    Post.create(post, function(err, obj){
                        if (err){
                            return res.serverError(err)
                        } else {
                            obj.upvote = 0
                            obj.tags.add(tag.id)
                            obj.save()
                            res.status(201)
                            res.json(obj)
                        }
                    })
                }
            )
        });
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

