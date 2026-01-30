import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import FormData from "form-data";

async function pushRepo() {
  try {
    const repoPath = path.resolve(process.cwd(), ".myGit");
    const configPath = path.join(repoPath, "config.json");

    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    const { userId, repoName, serverUrl } = config;

    if (!userId || !repoName || !serverUrl) {
      console.log("Repository not linked to remote");
      return;
    }

    const commitsPath = path.join(repoPath, "commits");
    const commits = fs.readdirSync(commitsPath);
    if (commits.length === 0) {
      console.log("No commits to push");
      return;
    }

    // latest commit
    const commitId = commits.sort().pop();
    const commitDir = path.join(commitsPath, commitId);

    const form = new FormData();
    form.append("userId", userId);
    form.append("repoName", repoName);
    form.append("commitId", commitId);

    const files = fs.readdirSync(commitDir);

    for (const file of files) {
      if (file === "commit.json") continue;
      form.append(
        "files",
        fs.createReadStream(path.join(commitDir, file)),
        file
      );
    }

    const res = await fetch(`${serverUrl}/repo/push`, {
      method: "POST",
      body: form,
      headers: form.getHeaders(), 
    });

    if (!res.ok) {
      console.log("Push failed");
      return;
    }

    console.log("Push successful");
  } catch (error) {
    console.error("Push error:", error.message);
  }
}

export default pushRepo;
