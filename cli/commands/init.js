


import fs from "fs/promises";
import path from "path";

async function initRepo() {
    // console.log( "first repo init done");
    const repoPath = path.resolve(process.cwd(), ".myGit");
    const commitsPath = path.join(repoPath, "commits");

    try {
        await fs.mkdir(repoPath, { recursive: true });
        await fs.mkdir(commitsPath, { recursive: true });

        await fs.writeFile(
            path.join(repoPath, "config.json"),
            JSON.stringify(
                {
                    bucket: process.env.S3_BUCKET || ""
                }, null, 2
            )
        )
        console.log("Repository initialised!");
    } catch (error) {
        console.log("someting went wrong", error);
    }

}

export default initRepo;