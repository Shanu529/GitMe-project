

import userController from "../controller/userController.js";
import { rateLimit } from "../middlerware/rateLimit.js";
import express from "express";

const Userrouter = express.Router();


//user routes
Userrouter.get("/alluser", userController.getAllUsers);
Userrouter.post("/signup", rateLimit, userController.signup); // rate limiting
Userrouter.post("/login", rateLimit, userController.login);  // rate limiting
Userrouter.get("/profile/:id", userController.getUserProfile);
Userrouter.put("/profile/:id", userController.updateUserProfile);
Userrouter.delete("/profile/:id", userController.deleteUserProfile);
Userrouter.post("/logout", userController.logout)

export default Userrouter