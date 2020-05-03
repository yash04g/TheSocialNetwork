
exports.getPosts = (req, res) => {
    res.json({
        posts : [
            { "title": 'First Post' }, { "title": 'Second Post' }
        ]
    })
}
