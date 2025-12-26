

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
    content: [
        {
            type: String,
        }
    ],

    visibility: {
        type: Boolean,
        default: true    
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