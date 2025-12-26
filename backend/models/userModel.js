

import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
    username: {
        type: String,
         required: true,
        unique: true
    },

    email: {
        type: String,
          required: true,   
        unique: true
    },

    password: {
        type: String,
         required: true  
    },

    repositories: [{
        // default: [],
        type: mongoose.Schema.Types.ObjectId,
        ref: "Repository"
    }],
    followedUsers: [{
        // default: [],
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    starRepos: [{
        // default: [],
        type: mongoose.Schema.Types.ObjectId,
        ref: "Repository"
    }]
},{ timestamps: true }  )

const User = mongoose.model("User", Userschema);
export default User;