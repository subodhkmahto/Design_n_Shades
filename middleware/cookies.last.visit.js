// In your middleware file (e.g., middleware.js)
export const setLastVisit = (req, res, next) => {
    if (req.cookies.lastVisit) {
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleDateString();
    }

    res.cookie('lastVisit', new Date().toISOString(), {
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
        httpOnly: true
    });

    next();
};
