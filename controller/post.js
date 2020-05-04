const Post = require("../model/post")


exports.getPosts = (req, res) => {
    const post = Post.find().select("_id title body")
    .then((posts)=>{
        return res.status(200).json({
            // posts : posts if key and value are same then we can do this
            posts 
        })
    })
    .catch(err => console.log(err))
}

exports.createPost = (req,res)=>{
    const post = new Post(req.body);
    post.save()
    .then((result)=>{
        res.status(200).json({
            post : result
        })
    })
}