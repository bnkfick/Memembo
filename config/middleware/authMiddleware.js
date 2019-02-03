const auth = {

    // checks if the user is logged in, if not, redirect to the unauthorized route
    isLoggedIn: (req, res, next)=> {
        if(req.isAuthenticated()){
            console.log('user authenticated');
            next();
        } else {
            console.log('user not authenticated');
            console.log(req.body);
            res.redirect('/api/users/unauthorized');
        }
    },

    // middleware function to log out the user
    logoutUser: (req, res, next)=> {
        if(req.isAuthenticated()){
            console.log('logged out successfully');
            req.logout();
            next();
        } else {
            next();
        }
    },

    // check to see if the user is authenticated, then if they are an admin.
    // if yes, move on, otherwise send to unauthorize route
    isAdmin: (req, res, next)=> {
        if (req.isAuthenticated()) {
            console.log('user confirmed');
            if(req.user.admin) {
                console.log('Admin Confirmed');
                next();
            } else {
                console.log('you must be an admin to continue');
                res.redirect('/api/users/unauthorized');
            }
        } else {
            res.redirect('/api/users/unauthorized');
        }
    }
};

module.exports = auth;