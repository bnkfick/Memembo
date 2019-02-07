const router = require("express").Router();
const passport = require("../../config/passport");
const db = require("../../models");
const authMiddleware = require ("../../config/middleware/authMiddleware");
const userController = require ("../../controllers/userController");

// /api/users/login
// route to login the user
router.post("/login", passport.authenticate("local", {
    failureRedirect: "/api/users/unauthorized",
    failureFlash : true
}), function (req, res, next) {
    console.log("sign in successful");
    console.log(req.user);
    res.json({
        user: req.user,
        loggedIn: true
    });
});

// /api/users/signup
// route to logout the user if they already have an account.
router.post("/signup", function(req, res, next) {
    db.User.findOne({username: req.body.username}, function(err, user) {
        if (err) throw err;
        if (user) {
            console.log("user already exists");
            return res.json("user already exists");
        }
        if (!user) {
            let newUser = new db.User({
                username: req.body.username,
                password: req.body.password
            })
            newUser.password = newUser.generateHash(req.body.password);
            newUser.save(function(err) {
                if (err) throw err;
                console.log("user saved!");

                //redirects to the login route as a post route *307*
                res.redirect(307, "/api/users/login");
            });
        }
    });
});

// /api/users/unauthorized
// if user is not logged in send error to front
router.get("/unauthorized", function(req, res, next) {
    let message = req.flash("error")[0];

    setTimeout(function() {
        res.json({
            message: message,
            loggedIn: false
        });
    }, 100);
});

// /api/users/profile
// if the user is logged in, this route sends the user information to the front end
router.get("/profile", authMiddleware.isLoggedIn, function(req, res, next) {
    res.json({
        user: req.user,
        loggedIn: true
    });
});

// /api/users/logout
// logs out the user
router.get("/logout", authMiddleware.logoutUser, function(req, res, next) {
    res.json("User logged out successfully");
});

// /api/users/profile
//route to check if the logged in user is flagged as an administrator
router.get("/admin", authMiddleware.isAdmin, function(req, res, next) {
    res.json({
        user: req.user,
        loggedIn: true
    });
});


router.post("/userScores/:id", function(req,res,next) {
    console.log("/api/userScores/:id");
    console.log(req.body);
    // == This should only be called if a user is logged in
    // == checking is a precaution
    if (!req.body.userid && !req.params.id) {
        console.log("NO USER ID");
        return res.end();
    }

    // db.User
    // .findOneAndUpdate({ _id: req.params.id, highScores: [{gameid: req.body.gameId}]}, 
    //                   { $push: {req.body.highScore}})
    // .then((data) => {
    //     console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    //     console.log(data);
    //     res.json(dbModel)
    // })
    // .catch(err => res.status(422).json(err));

    // db.User.findOne({_id: req.body.userid, highScore: [{gameid: req.body.gameId}]}, 
    //     function(err, gameHiScore) {
    //         if (err) throw err;
    //         if (gameHiScore) {
    //             console.log("gameHiScore already exists");
    //             return res.json("gameHiScore already exists");
    //     }
    //     if (!gameHiScore) {
    //         let newHiScore = new db.User({
    //             highScore: req.body.username,
    //             gameId: req.body.password
    //         })
    //     }
    // });
});

    

router.route("/userGames/:id")
    .get(userController.findById)
    .put(userController.update)
    .delete(userController.remove);



module.exports = router;
