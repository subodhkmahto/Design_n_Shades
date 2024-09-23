export const sessionAuth = (req, res, next) => {
    if (req.session.userEmail) {
        next();  // Call next as a function
    } else {
        return res.redirect('/login_you');  // Redirect to the login page if not authenticated
    }
};
