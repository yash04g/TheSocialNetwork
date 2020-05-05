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

exports.userSignUpValidator = (req,res,next)=>{
    // Name is not Null and between 4-20 characters
    req.check("name","Name is required").notEmpty();
    // Username is not Null
    req.check("username", "Username is required").notEmpty();
    // Email is not NULL, valid and normalized
    req.check("email", "Email is required").notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min : 4,
        max : 200
    })
    // Password is not NULL
    req.check("password", "Password is required").notEmpty()
    .isLength({
        min: 4,
        max: 200
    })
    .withMessage("Password must contain atleast 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    // Check for errors
    const errors = req.validationErrors();
    // If error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({
            error: firstError
        })
    }
    // Proceed to next middleware
    next();
}