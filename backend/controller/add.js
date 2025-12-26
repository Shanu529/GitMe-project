


import fs from "fs/promises";
import path from "path";

async function addRepo(filePath) {

    const repoPath = path.resolve(process.cwd(), ".myGit");
    const stagingPath = path.join(repoPath, "staging");

    try {
        // create staging directory if not exists
        await fs.mkdir(stagingPath, { recursive: true });

        // take file name from user input
        const fileName = path.basename(filePath);

        // copy file to staging area
        await fs.copyFile(filePath, path.join(stagingPath, fileName)); // .myGit/staging/fileName
        console.log(`file ${fileName} added to staging area`);
    } catch (error) {
        console.log("something went wrong in File added staging area", error);
    }
}

export default addRepo;
