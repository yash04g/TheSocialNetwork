exports.createPostValidator = (req,res,next)=>{
    // Title
    req.check('title',"Write a title").notEmpty();
    req.check('title','Title must be between 4 to 200 characters').isLength({
        min : 4,
        max : 200
    });
    // Body
    req.check('body', "Write a body").notEmpty();
    req.check('body', 'Body must be between 4 to 2000 characters').isLength({
        min: 4,
        max: 2000
    });
    // Check for errors
    const errors = req.validationErrors();
    // If error show the first one as they happen
    if(errors){
        const firstError = errors.map( error => error.msg)[0];
        return res.status(400).json({
            error : firstError
        })
    }
    // Proceed to next middleware
    next();
};