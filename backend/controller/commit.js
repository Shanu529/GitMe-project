
import { v4 as uuidv4 } from 'uuid';

import fs from "fs/promises";
import path from "path";

async function commitChanges(message) {

    const repoPath = path.resolve(process.cwd(), ".myGit"); //.myGit

    const stagingPath = path.join(repoPath, "staging"); //.myGit/staging

    const commitPath = path.join(repoPath, "commits"); // .myGit/commits

    try {
        const commitID = uuidv4();
        // createcommit directory if not existe
        const commitDir = path.join(commitPath, commitID); // .myGit/commits/commitID <- its name of file (ID)
        await fs.mkdir(commitDir, { recursive: true });

        // read all files from staging area
        const files = await fs.readdir(stagingPath);

        for (const file of files) {
            // copy each file to commit directory
            await fs.copyFile
                (path.join(stagingPath, file), // source: .myGit/staging/file
                    path.join(commitDir, file)); // destination: .myGit/commits/commitID/file
        }

        // create a commit message file
        await fs.writeFile(
            path.join(commitDir, "commit.json"), // .myGit/commits/commitsId/commit.json
            JSON.stringify({
                message, date: new Date().toISOString()
            })
        )

        console.log(`commit ${commitID} created with ${message}`);

    } catch (error) {
        console.error("something went wrong in commit changes", error)
    }

}

export default commitChanges;