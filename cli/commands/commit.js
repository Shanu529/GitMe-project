import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";

async function commitChanges(message) {
  try {
    const repoPath = path.resolve(process.cwd(), ".myGit");
    const stagingPath = path.join(repoPath, "staging");
    const commitsPath = path.join(repoPath, "commits");

    //  Check repo exists
    try {
      await fs.access(repoPath);
    } catch {
      console.log("Not a GitMe repository. Run gitme init first.");
      return;
    }

    //  Check staging exists
    try {
      await fs.access(stagingPath);
    } catch {
      console.log("Nothing to commit.");
      return;
    }

    const files = await fs.readdir(stagingPath);

    //  If staging empty
    if (files.length === 0) {
      console.log("Nothing to commit.");
      return;
    }

    const commitID = uuidv4();
    const commitDir = path.join(commitsPath, commitID);

    await fs.mkdir(commitDir, { recursive: true });

    // Copy staged files
    for (const file of files) {
      await fs.copyFile(
        path.join(stagingPath, file),
        path.join(commitDir, file)
      );
    }

    // Save commit metadata
    await fs.writeFile(
      path.join(commitDir, "commit.json"),
      JSON.stringify(
        {
          message,
          date: new Date().toISOString(),
          files,
        },
        null,
        2
      )
    );

    // Clear staging
    for (const file of files) {
      await fs.unlink(path.join(stagingPath, file));
    }

    console.log(`Commit ${commitID} created successfully `);
  } catch (error) {
    console.log("Error during commit:", error.message);
  }
}

export default commitChanges;