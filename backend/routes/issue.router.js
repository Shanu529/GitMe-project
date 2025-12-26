

import express from "express";
import issueController from "../controller/issueController.js";

const issueRouter = express.Router();

issueRouter.post("/issue/create", issueController.createIssue);
issueRouter.put("/issue/update/:id", issueController.updatIssuesById);
issueRouter.delete("/issue/delete/:id", issueController.deleteIssuesById);
issueRouter.get("/issue/all", issueController.getAllIssues);
issueRouter.get("/issue/:id", issueController.getIssueById);

export default issueRouter;