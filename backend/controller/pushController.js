import multer from "multer";
import fs from "fs";
import path from "path";

// multer setup (to receive files from client)
const upload = multer({ storage: multer.memoryStorage() });

const pushRepository = async (req, res) => {
  try {
    const { userId, repoName, commitId } = req.body;

    if (!userId || !repoName || !commitId) {
      return res.status(400).json({ message: "Missing data" });
    }

    // create storage path on server
    const commitPath = path.join(
      process.cwd(),
      "gitme-storage",
      userId,
      repoName,
      commitId
    );

    fs.mkdirSync(commitPath, { recursive: true });

    // save uploaded files
    for (const file of req.files) {
      fs.writeFileSync(
        path.join(commitPath, file.originalname),
        file.buffer
      );
    }

    res.status(200).json({ message: "Push successful" });

  } catch (error) {
    res.status(500).json({
      message: "Push failed",
      error: error.message
    });
  }
};

export default pushRepository;
export { upload };
