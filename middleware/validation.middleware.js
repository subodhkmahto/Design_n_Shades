// In validation.middleware.js
import { body, validationResult } from 'express-validator';

const validateRequest = async (req, res, next) => {
    await Promise.all([
        body('name').notEmpty().withMessage('Name is required').run(req),
        body('desc').notEmpty().withMessage('Description cannot be empty').run(req),
        body('price').isFloat({ gt: 0 }).withMessage('Price should be a positive number').run(req),
        body('url').isURL().withMessage('Invalid URL').run(req),
    ]);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('new-product', { errorMessage: errors.array()[0].msg });
    }

    next();
};

export default validateRequest;



// import { body, validationResult } from "express-validator";

// // src/middleware/validation.middleware.js
// const validateRequest = async (req, res, next) => {
//     // Define the validation rules
//     let body1 = [
//         body('name').notEmpty().withMessage('Name is required'),
//         body('price').isFloat({ gt: 0 }).withMessage('Price should be positive'),
//         body('url').isURL().withMessage('Invalid URL')
//     ];

//     // Run the validation rules
//     await Promise.all(body1.map((rule) => rule.run(req)));

//     // Check if there are any validation errors
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         // If there are errors, return the first error message
//         return res.render('new-product', { errorMessage: errors.array()[0].msg });
//     }

//     // No errors, proceed to the next middleware or route handler
//     next();
// };

// export default validateRequest;





// import { body, validationResult } from "express-validator";

// // src/middleware/validation.middleware.js
// const validateRequest = async (req, res, next) => {

//     //  express-validator

//     // setup the rules
//     let body1=[
//         body('name').notEmpty().withMessage('Name is required'),
//         body('price').isFloat({gt:0}).withMessage('price should be positive'),
//         body('url').isURL().withMessage('Invalid url')
//     ]

//     //those run rules
//     await Promise.all(
//         body1.map((rule)=>rule.run(req))
//     );


//     //  check  if  there are  any  errors  after runing the  rules 
//     var error=validationResult(req);

//     console.log(error);

//     console.log(error.array()[0]);
//     // if errors ,return the error message
//     if(error.isEmpty()){
//         return res.render('new-product', { errorMessage: error.array()[0].msg});   
//     }

//     // console.log(req.body);
//     // const { name, desc, price, url } = req.body;
//     // let errors = [];

//     // if (!name || name.trim() === '') {
//     //     errors.push('Name is required');
//     // }
//     // if (!desc || desc.trim() === '') {
//     //     errors.push('Description cannot be empty');
//     // }
//     // if (!price || parseFloat(price) >= 0) {
//     //     errors.push('Price should be a positive number');
//     // }

//     // try {
//     //     new URL(url); // Validate URL
//     // } catch (error) {
//     //     errors.push('URL is invalid');
//     // }

//     // if (errors.length > 0) {
//     //     return res.render('new-product', { errorMessage: errors[0]});
//     // }

//     next(); // Continue to the next middleware or route handler
// };

// export default validateRequest;
