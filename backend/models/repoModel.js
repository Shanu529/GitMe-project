

import mongoose, { Schema } from "mongoose";

const RepositorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,

    },
    currentCommitId: {
        type: String,
        default: null
    },
    content: [
        {
            type: String,
        }
    ],

    visibility: {
        type: String,
        enum: ["public", "private"],
        default: "public"
    },


    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },


    issues: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Issue"
        }
    ],

})

const Repository = mongoose.model("Repository", RepositorySchema);

export default Repository;