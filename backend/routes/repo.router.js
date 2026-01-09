import express from "express";
import repoController from "../controller/repoController.js";
import pushRepo, { upload } from "../controller/push.js";

const repoRoute = express.Router();

// PUSH ROUTE
repoRoute.post("/repo/push", upload.array("files"), pushRepo);

// REPO ROUTES
repoRoute.post("/repo/create", repoController.createRepository);
repoRoute.get("/repo/all", repoController.getAllRepository);
repoRoute.get("/repo/:id", repoController.fatchedRepositoryById);
repoRoute.get("/repo/name/:name", repoController.fatchedRepositoryByName);
repoRoute.get("/repo/user/:userID", repoController.fatchedRepositorisForCurrentUser);
repoRoute.put("/repo/update/:id", repoController.updateRepositoryById);
repoRoute.patch("/repo/toggle/:id", repoController.toggeleVisibilityById);
repoRoute.delete("/repo/delete/:id", repoController.deleRepositoryById);

export default repoRoute;
