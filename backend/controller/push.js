import multer from "multer";
import fs from "fs";
import path from "path";

// multer setup
const upload = multer({ storage: multer.memoryStorage() });

// push logic
const pushRepo = async (req, res) => {
  try {
    const { userId, repoName, commitId } = req.body;

    if (!userId || !repoName || !commitId) {
      return res.status(400).json({ message: "Missing data" });
    }

    const repoPath = path.join(
      "gitme-storage",
      userId,
      repoName,
      commitId
    );

    fs.mkdirSync(repoPath, { recursive: true });

    for (const file of req.files) {
      fs.writeFileSync(
        path.join(repoPath, file.originalname),
        file.buffer
      );
    }

    res.status(200).json({ message: "Push successful" });
  } catch (error) {
    res.status(500).json({ message: "Push failed", error });
  }
};

// DEFAULT EXPORT
export default pushRepo;

// NAMED EXPORT
export { upload };
