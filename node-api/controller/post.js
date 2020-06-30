const Post = require("../model/post")
const formidable = require("formidable")
const fs = require("fs")
const _ = require('lodash')

exports.postById = (req, res, next, id) => {

    Post.findById(id) // use findById method to find id
    .populate("postedBy", "_id name") // overwrite save file with _id name
    // executes query
    .exec((err, post) => {
        // if there's error or there's no post
        if (err || !post) {
            return res.status(400).json({
                error: err
            })
        }
        req.post = post // Adds profile object in req with post info
        next();
    })
}

exports.getPosts = (req, res) => {
    const post = Post.find()
    .populate("postedBy","_id name")
    .select("_id title body")
    .then((posts)=>{
        return res.status(200).json({
            // posts : posts if key and value are same then we can do this
            posts 
        })
    })
    .catch(err => console.log(err))
}

exports.createPost = (req, res) => {
    let form = new formidable.IncomingForm(); // gives us incoming form fields
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded! "
            })
        }
        let post = new Post(fields);
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;
        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(result); // result is the post saved
        })
    })
};

exports.postsByUser = (req,res)=>{
    Post.find({ postedBy: req.profile._id})
        .populate("postedBy","_id name") // we use posted by because its present on different model else we would have used select
        .sort("_created")
        .exec((err,posts)=>{
            if(err){
                return res.status(400).json({
                    error: err
                })
            }
            res.json(posts)
        })
};

exports.isPoster = (req, res, next) => {
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
    if (!isPoster) {
        return res.status(403).json({
            error: 'User is not authorized.'
        });
    }
    next();
};
exports.updatePost = (req, res, next) => {
    let post = req.post;
    post = _.extend(post, req.body)
    post.updated = Date.now()
    post.save((err) => {
        if (err) {
            return res.status(400).json({
                error: "You are not authorized to perform this action!"
            })
        }
        res.json(post);
    })
};

exports.deletePost = (req, res) => {
    let post = req.post;
    post.remove((err, post) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: 'Post deleted successfully'
        });
    });
};

