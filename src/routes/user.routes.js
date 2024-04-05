import { Router } from "express";
import { 
    changeCurrentPassword, 
    getCurrentUser, 
    getUserChannelProfile, 
    getWatchHistory, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    registerUser, 
    updateAccountDetails, 
    updateUserAvatar, 
    updateUserCoverImage 
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import verifyJWT from "../middlewares/auth.middleware.js";
const router  = Router()

// REVIEW: Register Route
router.route("/register").post(
    // Middleware
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)

// REVIEW: Login Route
router.route("/login").post(loginUser)

// REVIEW: Logout secured route
// secured routes with middleware
router.route("/logout").post(
    verifyJWT, 
    logoutUser)

// REVIEW: Refresh Access Token route
router.route("/refresh-token").post(refreshAccessToken)

// REVIEW: Change Password
router.route("/change-password").post(verifyJWT,changeCurrentPassword)

// REVIEW: Current User
router.route("/current-user").get(verifyJWT,getCurrentUser)

// REVIEW: Update Account/Details
router.route("/update-account").patch(verifyJWT,updateAccountDetails)

// REVIEW: Avatar Update
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)

// REVIEW: CoverImage Update
router.route("/cover-image").patch(verifyJWT, upload.single("/coverImage"),updateUserCoverImage)

// REVIEW : Channel profile , Since it is url and params is used thus /c/: is used here. 
router.route("/c/:username").get(verifyJWT,getUserChannelProfile)

// REVIEW : Watch History
router.route("/history").get(verifyJWT,getWatchHistory)

export default router