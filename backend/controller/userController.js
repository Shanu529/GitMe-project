

import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectRedis } from "../config/redis.js";



const signup = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        //check if user already exixts
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All Fields are required" });
        }

        // check user exist?
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(409).json({ message: "User Already Exist" });
        }

        // hash format 
        const hashPass = await bcrypt.hash(password, 10);

        // save user in DB
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashPass,
            repositories: [],
            followedUsers: [],
            starRepos: [],
        });

        // Generate Token 
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_KEY, { expiresIn: "7d" })

        // const token = jwt.sign(
        //     {
        //         id: user._id,
        //         email: user.email,
        //     },
        //     process.env.JWT_KEY,
        //     { expiresIn: "7d" }
        // );

        // send Response
        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                name: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "server error :", error: error.message });
    }
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All Fields are required" })
        }

        // check user exist or not
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        };

        // generate token
        const token = await jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: "7d" });
        // const token = jwt.sign(
        //     {
        //         id: user._id,
        //         email: user.email,
        //     },
        //     process.env.JWT_KEY,
        //     { expiresIn: "7d" }
        // );

        res.status(200).json({
            message: "Login successful", token, user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({ message: "server error :", error: error.message });
    }

}

const getAllUsers = async (req, res) => {
    try {
        const gettingallUser = await User.find({});
        res.status(200).json({ message: "all user fatched", gettingallUser });
    } catch (error) {
        res.status(500).json({ message: "something went worng", error })
    }
};

const getUserProfile = async (req, res) => {
    try {

        const userId = req.params.id;
        // const  = await User.find({ userId });
        const getOneUser = await User
            .findById(userId)
            .select("-password"); // hide password
        res.status(200).json({ message: "get one user", getOneUser });
    } catch (error) {
        res.status(500).json({ message: "something went worng", error })
    }
};


const updateUserProfile = async (req, res) => {

    try {
        const userId = req.params.id

        const { username,
            email,
            password,
            bio,
            profession,
            city,
            country } = req.body;

        // find user to update details
        const user = await User.findById(userId);

        if (username) user.username = username;
        if (email) user.email = email;
        if (bio) user.bio = bio;
        if (profession) user.profession = profession;
        if (city) user.city = city;
        if (country) user.country = country;
        await user.save();

        res.status(200).json({
            message: "Profile updated",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                bio: user.bio,
                profession: user.profession,
                city: user.city,
                country: user.country
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Update failed",
            error: error.message
        });
    }


}

const deleteUserProfile = async (req, res) => {

    try {
        const userID = req.params.id;

        const deleteUser = await User.findByIdAndDelete(userID);
        if (!deleteUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({
            message: "Delete failed",
            error: error.message
        });
    }

}

const logout = async (req, res) => {

    try {

        // get token fromm headers
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.json({ message: "no token provided" });
        }

        const token = authHeader.split(" ")[1];

        // decode jwt token 
        const decoded = jwt.decode(token)
        if (!decoded || !decoded.exp) {
            return res.status(400).json({ message: "Invalid token " })
        }

        const redis = await connectRedis();

        const ttl = decoded.exp - Math.floor(Date.now() / 1000);

        // token store in redis as a blacklist token

        if (ttl > 0) {
            await redis.set(`blacklist:${token}`, "true", {
                EX: ttl
            })
        }


        return res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Logout failed" });

    }
}

export default {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    logout
}