const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
/* 
module.exports.createPost = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id,
    }, function (err, newPost) {
        if (err) {
            console.log(`Error: ${err}! \nCannot create a new post`);
            return;
        }
        return res.redirect('back');
    });
} 
*/

// using async await
/* module.exports.createPost = async function (req, res) {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id,
        });
        req.flash('success','Post created!');
        return res.redirect('back');
    } catch (err) {
        req.flash('error','err');
        console.log(`Error: ${err}! \nCannot create a new post`);
        return res.redirect('back');
    }
} */

// using async await and ajax
module.exports.createPost = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id,
        });

        if(req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            // post = await post.populate('user', 'name').execPopulate();
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }
        req.flash('success','Post created!');
        return res.redirect('back');
    } catch (err) {
        req.flash('error','err');
        console.log(`Error: ${err}! \nCannot create a new post`);
        return res.redirect('back');
    }
}

/* 
module.exports.destroyPost = function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        //.id means converting the object id into string
        if (post.user == req.user.id) {
            post.remove();
            Comment.deleteMany({
                post: req.params.id,
            },
                function (err) {
                    return res.redirect('back');
                }
            )
        } else {
            return res.redirect('back');
        }
    });
} 
*/

// using async await
module.exports.destroyPost = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
    //.id means converting the object id into string
    if (post.user == req.user.id) {

        // CHANGE :: delete the associated likes for the post and all its comments' likes too
        await Like.deleteMany({likeable: post, onModel: 'Post'});
        await Like.deleteMany({_id: {$in: post.comment}});
        post.remove();

        await Comment.deleteMany({
            post: req.params.id,
        });

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: "Post deleted!"
            });
        }

        req.flash('success','Post and related comments deleted!');
    return res.redirect('back');
    } else {
        req.flash('error','You are not allowed to delete this post');
        return res.redirect('back');
    }
    } catch (err) {
        req.flash('error','err');
        console.log(`Error: ${err}! \nCannot delete the post`);
        return res.redirect('back');
    }
    
}