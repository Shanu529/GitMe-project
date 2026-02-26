#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import initRepo from "./commands/init.js";
import addRepo from "./commands/add.js";
import commitChange from "./commands/commit.js";
import pullRepo from "./commands/pull.js";
import revertRepo from "./commands/revert.js";

yargs(hideBin(process.argv))
  .scriptName("gitme")
  .usage(
    "GitMe CLI - Lightweight Git-like Version Control System\n\nUsage:\n  gitme <command>"
  )

  // INIT
  .command(
    "init",
    "Initialize a new repository",
    {},
    initRepo
  )

  // ADD
  .command(
    "add <file>",
    "Add file to staging area",
    (y) =>
      y.positional("file", {
        describe: "File path to add",
        type: "string",
      }),
    (args) => addRepo(args.file)
  )

  // COMMIT
  .command(
    "commit <message>",
    "Create a commit snapshot",
    (y) =>
      y.positional("message", {
        describe: "Commit message",
        type: "string",
      }),
    (args) => commitChange(args.message)
  )

  // PULL
  .command(
    "pull",
    "Pull from remote repository",
    {},
    pullRepo
  )

  // REVERT
  .command(
    "revert <commitID>",
    "Revert to a specific commit",
    (y) =>
      y.positional("commitID", {
        describe: "Commit ID to revert",
        type: "string",
      }),
    revertRepo
  )

  .demandCommand(1, "Please provide a valid command")
  .strict()
  .help()
  .alias("h", "help")
  .alias("v", "version")
  .wrap(null)
  .parse();