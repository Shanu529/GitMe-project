

import express from "express";

import Userrouter from "./user.router.js";
import repoRoute from "./repo.router.js";
import issueRouter from "./issue.router.js";

const mainRouter = express.Router();

mainRouter.use(Userrouter);
mainRouter.use(repoRoute);
mainRouter.use(issueRouter);

export default mainRouter;