const Comment = require('../models/comment');
const Post = require('../models/post');
const commentMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

/* 
module.exports.createComment = function (req, res) {
    Post.findById(req.body.post, function (err, post) {

        if (err) {
            console.log(`Error ${err} \nCannot find the post`);
            return;
        }
        if (post) {
            Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            }, function (err, comment) {
                if (err) {
                    console.log(`Error ${err} \nCannot create the comment`);
                    return;
                }
                post.comment.push(comment);
                post.save();
                res.redirect('back');
            });
        }
    });

} 
*/

// using async await
/* 
module.exports.createComment = async function (req, res) {
    try {
        console.log(req.body);
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            });
            post.comment.push(comment);
            post.save();
            res.redirect('back');
        }
    } catch (err) {
        console.log(`Error ${err} \nCannot find the post to create the comment`);
        return;
    }

} 
*/

// using ajax 
module.exports.createComment = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            });
            post.comment.push(comment);
            post.save();

            // no longer used, removed from documentation
            // comment = await comment.populate('user','name email_id').exec(populate());
            comment = await comment.populate('user','name email_id');

            // mail the user that the comment has been published
            // commentMailer.newComment(comment);

            // putting the job inside comment email queue 
            let job = queue.create('emails',comment).save (function(err){
                if(err){
                    console.log(`Error in sending to the comment email queue\nError code-${err}`);
                    return;
                };
                console.log(`Job enqueued! Job id-${job.id}`);
            });

            // ajax
            if(req.xhr){
                // comment = await comment.populate('user','name').execPopulate();
                return res.status(200).json({
                    data: {
                        comment:comment
                    },
                    message: "Post created!"
                });
            }

            req.flash("success","Comment published!");
            res.redirect('back');
        }
    } catch (err) {
        console.log(`Error ${err} \nCannot find the post to create the comment`);
        req.flash('error', err);
        return;
    }

}


/* 
module.exports.destroyComment = function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {
        if (comment.user == req.user.id) {
            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: { comment: req.params.id } }, function (err, post) {
                return res.redirect('back');
            })
        } else {
            return res.redirect('back');
        }
    })
}
*/
// using async await

module.exports.destroyComment = async function (req, res) {
    try{
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;

            comment.remove();

            let post = await Post.findByIdAndUpdate(postId, { $pull: { comment: req.params.id } }, function (err, post) {
                return res.redirect('back');
            })
        } else {
            return res.redirect('back');
        }
    }catch(err){
        console.log(`Error ${err} \nCannot find the post to delete the comment`);
        return;
    }
    
}


