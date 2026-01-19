#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import initRepo from "./commands/init.js";
import addRepo from "./commands/add.js";
import commitChange from "./commands/commit.js";
import pullRepo from "./commands/pull.js";
import revertRepo from "./commands/revert.js";



yargs(hideBin(process.argv))
  .command("init", "initialize repository", {}, initRepo)
  .command(
    "add <file>",
    "add file",
    (y) => y.positional("file", { type: "string" }),
    (args) => addRepo(args.file)
  )
  .command(
    "commit <message>",
    "commit changes",
    (y) => y.positional("message", { type: "string" }),
    (args) => commitChange(args.message)
  )
  .command("pull", "pull changes", {}, pullRepo)
  .command(
    "revert <commitID>",
    "revert commit",
    (y) => y.positional("commitID", { type: "string" }),
    revertRepo
  )
  .demandCommand(1)
  .help()
  .parse();
