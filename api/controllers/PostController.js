/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create_post: function(req, res){
        var post = req.params.all()
        post.author = req.user
        post.upvote = 0
        // upload picture
        req.file('picture').upload(function (err, files) {
            if (err) return res.serverError(err)

            if (files.length === 0) return res.badRequest('No picture uploaded')

            var picture = {
                picFd: files[0].fd
            }
            post.picture = picture

            // find tag
            Tag.findOrCreate({brand: post.brand}, 
                            {brand: post.brand}).
                            then(
                function(tag){
                    tag.posts.add(post)
                    tag.save()
                    res.status(201)
                    res.redirect('/')
                })
        })
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
                res.redirect('/')
            }
        )
    },
};
