// import multer from "multer";
// import fs from "fs";
// import path from "path";
// import Repository from "../models/repoModel.js";

// const upload = multer({ storage: multer.memoryStorage() });

// const pushRepository = async (req, res) => {
//   try {
//     const { userId, repoId, commitId } = req.body;

//     if (!userId || !repoId || !commitId) {
//       return res.status(400).json({ message: "Missing data" });
//     }

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     //  get repo from MongoDB
//     const repo = await Repository.findById(repoId);
//     if (!repo) {
//       return res.status(404).json({ message: "Repository not found" });
//     }

//     //  correct storage path
//     const commitPath = path.join(
//       process.cwd(),
//       "gitme-storage",
//       userId,
//       repo.name,
//       commitId
//     );

//     fs.mkdirSync(commitPath, { recursive: true });

//     //save files + update MongoDB
//     for (const file of req.files) {
//       fs.writeFileSync(
//         path.join(commitPath, file.originalname),
//         file.buffer
//       );


//       if (!repo.content.includes(file.originalname)) {
//         repo.content.push(file.originalname);
//       }
//     }

//     repo.currentCommitId = commitId;

//     await repo.save();

//     res.status(200).json({
//       message: "Push successful",
//       files: req.files.map(f => f.originalname)
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: "Push failed",
//       error: error.message
//     });
//   }
// };

// export default pushRepository;
// export { upload };


import multer from "multer";
import fs from "fs";
import path from "path";
import Repository from "../models/repoModel.js";

const upload = multer({ storage: multer.memoryStorage() });

const pushRepository = async (req, res) => {
  try {
    const { repoId, commitId } = req.body;

    const userId = req.user.id // from middlerware
    if (!userId || !repoId || !commitId) {
      return res.status(400).json({ message: "Missing data" });
    }

    const repo = await Repository.findById(repoId);
    if (!repo) {
      return res.status(404).json({ message: "Repository not found" });
    }

    // Authorrization check
    if (repo.owner.toString() !== userId) {
      return res.status(403).json({
        message: "You are not allowed to push to this repository",
      });
    }

    const repoBasePath = path.join(
      process.cwd(),
      "gitme-storage",
      repo.owner.toString(),
      repo.name
    );

    const newCommitPath = path.join(repoBasePath, commitId);

    fs.mkdirSync(newCommitPath, { recursive: true });

    // copy previous commit
    if (repo.currentCommitId) {
      const prevCommitPath = path.join(
        repoBasePath,
        repo.currentCommitId
      );

      if (fs.existsSync(prevCommitPath)) {
        const prevFiles = fs.readdirSync(prevCommitPath);

        for (const file of prevFiles) {
          fs.copyFileSync(
            path.join(prevCommitPath, file),
            path.join(newCommitPath, file)
          );
        }
      }
    }

    // overwrite with new files
    for (const file of req.files) {
      fs.writeFileSync(
        path.join(newCommitPath, file.originalname),
        file.buffer
      );

      if (!repo.content.includes(file.originalname)) {
        repo.content.push(file.originalname);
      }
    }

    // update current commmit
    repo.currentCommitId = commitId;
    await repo.save();

    res.status(200).json({
      message: "Push successful",
      commitId,
    });

  } catch (error) {
    res.status(500).json({
      message: "Push failed",
      error: error.message
    });
  }
};

export default pushRepository;
export { upload };
