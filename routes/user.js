const Express = require("express");
const router = Express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../view/utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");




router
    .route("/signup")
    .get(userController.renderSignupForm)//render signup form
    .post(wrapAsync(userController.signup));//signup




router
    .route("/login")
    .get(userController.renderLoginForm)////render login form
    .post(saveRedirectUrl,
        passport.authenticate("local",
            {
                failureRedirect: '/login',
                failureFlash: true
            })
        , userController.login);//login



//logout
router.get("/logout", userController.logout);


module.exports = router;




