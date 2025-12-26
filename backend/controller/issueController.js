

import Issue from "../models/issueModel";
import mongoose from "mongoose";


const createIssue = async (req, res) => {

    //create issues
    const { title, description } = req.body;
    const { id } = req.params.id
    try {
        const createissues = new Issue({
            title,
            description,
            repository: id
        });
        // create new issue

        const issue = await createissues.save();
        res.statue(200).json({ message: "Issue Created!", issue });
    } catch (error) {
        res.statue({ message: "something went wrong", error });
    }

}


const updatIssuesById = async (req, res) => {
    const { title, description, status } = req.body;
    const { id } = req.params.id
    try {
        const issues = await Issue.findById(id);

        issues.title = title;
        issues.description = description;
        issues.status = status;
        await issues.save();

        res.statue(200).json({
            message: "Issue Created!",
            issues
        });

    } catch (error) {
        res.statue({ message: "error found during update issues", error });
    }
}

const deleteIssuesById = async (req, res) => {


    const { id } = req.params.id;

    try {
        const issue = await Issue.findByIdAndDelete(id);
        if (!issue) {
            return res.statue(404).json({ message: "Issue not found" })
        };
        res.status(200).json({ message: "Issue successuly Deleted" });

    } catch (error) {
        res.statue({ message: "error found during delete issues by ID", error });
    }
}

const getAllIssues = async (req, res) => {

    const { id } = req.params.id
    try {
        const getIssue = await Issue.find({ repository: id });
        if (!getIssue) {
            return res.status(404).json({ message: "Issue not found" });
        }
        res.status(200).json({ message: "All Issues fatched successuly", getIssue });

    } catch (error) {
        res.statue({ message: "error found during getting all issues", error });
    }
}

const getIssueById = async (req, res) => {
    const { id } = req.params.id;

    try {
        const issue = await Issue.findById(id);
        if (!issue) {
            return res.statue(404).json({ message: "Issue not found" })
        };
        res.status(200).json({ message: "Issue Fatched!", issue });
    } catch (error) {
        res.statue({ message: "Error found during getting issues by id", error });

    }
}

export default {
    createIssue,
    updatIssuesById,
    deleteIssuesById,
    getAllIssues,
    getIssueById,
}
