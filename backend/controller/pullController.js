import fs from "fs/promises";
import path from "path";

const pullRepository = async (req, res) => {
  try {
    console.log("🔥 PUSH HIT");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files?.length);
    const { userId, repoName } = req.params;

    console.log("PULL HIT:", userId, repoName);

    const repoPath = path.join(
      process.cwd(),
      "gitme-storage",
      userId,
      repoName
    );

    console.log("LOOKING FOR REPO AT:", repoPath);

    // check repo folder
    try {
      await fs.access(repoPath);
    } catch {
      console.log("❌ Repo folder not found");
      return res.status(404).json({ message: "Repo not found on server" });
    }

    const commits = await fs.readdir(repoPath);
    console.log("COMMITS FOUND:", commits);

    if (commits.length === 0) {
      console.log("❌ No commits found");
      return res.status(404).json({ message: "No commits found" });
    }

    const latestCommitId = commits.sort().pop();
    const commitPath = path.join(repoPath, latestCommitId);

    console.log("USING COMMIT:", latestCommitId);

    const filesInCommit = await fs.readdir(commitPath);

    const files = [];
    for (const file of filesInCommit) {
      if (file === "commit.json") continue;

      const content = await fs.readFile(
        path.join(commitPath, file),
        "utf-8"
      );

      files.push({ name: file, content });
    }

    return res.status(200).json({
      commitId: latestCommitId,
      files
    });

  } catch (error) {
    console.error("PULL ERROR:", error);
    res.status(500).json({ message: "Pull failed", error: error.message });
  }
};

export default pullRepository;
