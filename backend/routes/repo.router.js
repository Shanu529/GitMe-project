

import express from "express";

const repoRoute = express.Router();
import repoController from "../controller/repoController.js";

// repo routes
// these are routes to created  createRepository,
// getAllRepository,
// fatchedRepositoryById,
// fatchedRepositoryByName,
// fatchedRepositorisForCurrentUser,
// updateRepositoryById,
// toggeleVisibilityById,
// deleRepositoryById,
 
repoRoute.post("/repo/create", repoController.createRepository);
repoRoute.get("/repo/all", repoController.getAllRepository);
repoRoute.get("/repo/:id", repoController.fatchedRepositoryById);
repoRoute.get("/repo/name/:name", repoController.fatchedRepositoryByName);
repoRoute.get("/repo/user/:userID", repoController.fatchedRepositorisForCurrentUser);
repoRoute.put("/repo/update/:id", repoController.updateRepositoryById);
repoRoute.patch("/repo/toggle/:id", repoController.toggeleVisibilityById);
repoRoute.delete("/repo/delete/:id", repoController.deleRepositoryById);


export default repoRoute;