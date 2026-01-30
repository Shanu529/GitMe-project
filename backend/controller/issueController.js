

import Issue from "../models/issueModel.js";
import mongoose from "mongoose";


const createIssue = async (req, res) => {

    //create issues
    const { title, description } = req.body;
    // const { id } = req.params.id
    const { id } = req.params;
    try {
        const createissues = new Issue({
            title,
            description,
            repository: id
        });
        // create new issue

        const issue = await createissues.save();
        res.status(201).json({ message: "Issue Created!", issue });
    } catch (error) {
        res.status(500).json({
            message: "Error during creating issue",
            error,
        });
    }
}


const updatIssuesById = async (req, res) => {
    const { title, description, status } = req.body;
    const { id } = req.params.id
    try {
        const issues = await Issue.findById(id);
        if (!issues) {
            return res.status(404).json({ message: "Issue Not Found" });
        }

        issues.title = title;
        issues.description = description;
        issues.status = status;
        await issues.save();

        res.status(200).json({
            message: "Issue Created!",
            issues
        });

    } catch (error) {
        res.status(500).json({
            message: "Error during updating issue",
            error,
        });
    }
}

const deleteIssuesById = async (req, res) => {


    const { id } = req.params.id;

    try {
        const issue = await Issue.findByIdAndDelete(id);
        if (!issue) {
            return res.status(404).json({ message: "Issue not found" })
        };
        res.status(200).json({ message: "Issue successuly Deleted" });

    } catch (error) {
        res.status(500).json({
            message: "Error during deleting issue by id",
            error,
        });
    }
}

const getAllIssues = async (req, res) => {

    const { id } = req.params.id // repo id
    try {
        const getIssue = await Issue.find({ repository: id });
        if (!getIssue) {
            return res.status(404).json({ message: "Issue not found" });
        }
        res.status(200).json({ message: "All Issues fatched successuly", getIssue });

    } catch (error) {
        res.status(500).json({
            message: "Error during fetching all issue",
            error,
        });
    }
}

const getIssueById = async (req, res) => {
    const { id } = req.params.id;

    try {
        const issue = await Issue.findById(id);
        if (!issue) {
            return res.status(404).json({ message: "Issue not found" })
        };
        res.status(200).json({ message: "Issue Fatched!", issue });
    } catch (error) {
        res.status(500).json({
            message: "Error during fetching issue by id",
            error,
        });

    }
}

export default {
    createIssue,
    updatIssuesById,
    deleteIssuesById,
    getAllIssues,
    getIssueById,
}
