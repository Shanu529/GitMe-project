
import mongoose from "mongoose";
import Repository from "../models/repoModel.js";
import Issue from "../models/issueModel.js";

import { fileURLToPath } from "url";

import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createRepository = async (req, res) => {

    try {
        const { name, owner, content, description, visibility, issues } = req.body;
        if (!owner || !name) {
            return res.status(404).json({ message: "user not found", error });
        }

        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({ message: "Invaild UserId Try again" });
        }

        const newRepository = new Repository({
            name,
            owner,
            content,
            description,
            visibility,
            issues
        });

        const result = await newRepository.save();

        res.status(200).json({
            message: "Repository created!",
            repositoryId: result._id
        });


    } catch (error) {
        return res.status(500).json({ message: "something went wrong", error })
    }

}

const getAllRepository = async (req, res) => {
    try {
        const repositories = await Repository.find({})
            .populate("owner")
            .populate("issues");

        res.status(200).json({ message: "all repositories are fatched", repositories })
    } catch (error) {
        res.status(500).json({ message: "something went wrong", error })
    }
}

const fatchedRepositoryById = async (req, res) => {
    const { id } = req.params
    try {
        const repository = await Repository.find({ _id: id })
            .populate("owner")
            .populate("issues")
        // .toArray();

        res.status(200).json({ message: "Repository fatched", repository });
    } catch (error) {
        res.status(500).json({ message: "something went wrong", error })
    }
}

const fatchedRepositoryByName = async (req, res) => {
    const { name } = req.params.name;
    try {
        if (!name) {
            return res.status(404).json({ message: "Invaild user name" });
        }

        const repository = await Repository.find({ name: name })
            .populate("owner")
            .populate("issues")
    } catch (error) {
        console.error("error found during fatching repository by name");
        res.status(500).json({ message: "someting wernt wrong", error });
    }
}

const fatchedRepositorisForCurrentUser = async (req, res) => {
    const { userID } = req.params;

    try {
        const userRepo = await Repository.find({ owner: userID });

        res.status(200).json({
            repositories: userRepo // [] is OK
        });

    } catch (error) {
        res.status(500).json({ message: "something went wrong", error });
    }
};

const updateRepositoryById = async (req, res) => {

    const { id } = req.params.id;
    const { description, content } = req.body;
    try {
        const updateRepo = await Repository.findById(id);
        if (description) {
            updateRepo.description = description;
        }
        updateRepo.content.push(content);

        const updateRepository = await updateRepo.save();
        res.status(200).json({
            message: "Update Repository successfuly",
            Repository: updateRepository
        });

    } catch (error) {
        console.error("error found during update repository by ID");
        res.status(500).json({ message: "someting wernt wrong", error });
    }
}

const toggeleVisibilityById = async (req, res) => {
    const { id } = raq.params.id;
    try {
        const repository = await Repository.findById(id);
        repository.visibility = !repository.visibility;

        const updateVisibility = await repository.save();

        res.status(200).json({
            message: "Repository Visibility Change Successfully",
            updateVisibility
        });

    } catch (error) {
        console.error("error found during update ToggeleVisibility by ID");
        res.status(500).json({ message: "someting wernt wrong", error });
    }
}

const deleRepositoryById = async (req, res) => {

    const { id } = req.params.id;
    try {
        const repository = await Repository.findByIdAndDelete(id);
        if (!repository) {
            return res.status(404).json({ error: "Repository not found" })
        }

    } catch (error) {
        console.error("Error found During Deleting Repository by ID");
        res.status(500).json({ message: "someting wernt wrong", error });
    }
}

const getFileContent = async (req, res) => {

    try {
        const { repoId, commitId, filename } = req.params;
        const repo = await Repository.findById(repoId).populate("owner", "username");
        if (!repo) {
            return res.status(404).json({ message: "Repository not found" })
        }

        // build file path
        // const filePath =
        //     path.join(process.cwd(),
        //         "gitme-storage",
        //         repo.owner.username,
        //         repo.name,
        //         commitId,
        //         filename)
        // const filePath = path.join(
        //     new URL("../gitme-storage", import.meta.url).pathname,
        //     repo.owner.username,
        //     repo.name,
        //     commitId,
        //     filename
        // );

        const filePath = path.join(
            __dirname,
            "..",               // controller → backend
            "gitme-storage",
            repo.owner.username,
            repo.name,
            commitId,
            filename
        );
        console.log("FINAL FILE PATH:", filePath);



        // check  file is exist or nott
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "File Not Founddd" })
        }

        // read file
        const content = fs.readFileSync(filePath, "utf-8");

        // send it to frontend
        res.status(200).json({
            filename,
            content
        })
    } catch (error) {
        console.error("READ FILE ERROR:", error);
        res.status(500).json({
            message: "something went wrong to read file",
            error: error.message
        });
        // res.status(500).json({ message: "something went wrong to read file", error })
    }

}

const getFilesOfCommit = async (req, res) => {

    try {
        const { commitId, repoId } = req.params;

        const repo = await Repository.findById(repoId).populate("owner", "username")

        if (!repo) {
            return res.status(400).json({ message: "repository not found" })
        }

        // build path
        const commitPath = path.join(
            // __dirname,"..","gitme-storage", repo.owner.username, commitId
            __dirname,
            "..",
            "gitme-storage",
            repo.owner.username,
            repo.name,
            commitId
        )

        // check file commmit exist or not
        if (!fs.existsSync(commitPath)) {
            return res.status(400).json({ message: "commit not found" })
        }

        // if exist then read it
        // const files = fs.readFileSync(commitPath);

        // READ ALL FILES
        const files = fs
            .readdirSync(commitPath)
            .filter(file =>
                fs.statSync(path.join(commitPath, file)).isFile()
            );


        // send it to frontend
        res.status(200).json({ files })
    } catch (error) {
        res.status(500).json({ message: "somthing went wrong", error })
    }


}

export default {
    createRepository,
    getAllRepository,
    fatchedRepositoryById,
    fatchedRepositoryByName,
    fatchedRepositorisForCurrentUser,
    updateRepositoryById,
    toggeleVisibilityById,
    deleRepositoryById,
    getFileContent,
    getFilesOfCommit
}