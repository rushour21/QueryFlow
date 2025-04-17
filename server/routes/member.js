import express from 'express';
import Users from '../modals/users';
import { errorLogger } from "../middleware/log.js";
import { authMiddleware } from "../middleware/auth.js";
import dotenv from "dotenv";
import e from 'express';
dotenv.config();
const router = express.Router();

router.post("/addmember", authMiddleware, errorLogger, async (req, res) => {
    try {
        const { username, email, designation } = req.body;
        const existingUser = await Users.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "this member is already added" });
        }
        const newMember = new Users({
            userName: username,
            email: email,
            designation: designation,
            createdBy: req.user.id,
        });
        await newMember.save();
        res.status(201).json({ message: "Member added successfully", userId: newMember._id });
    } catch (error) {
        
        errorLogger(error);
        res.status(500).json({ message: "Internal server error" });
    }
})

router.get("/members", authMiddleware, async (req, res) => {
    try {
        const members =  await Users.find({ createdBy: req.user.id }).select("userName email designation ");
        if (!members) {
            return res.status(404).json({ message: "No members found" });
        }
        res.status(200).json({ members });
    } catch (error) {
        
        errorLogger(error);
        res.status(500).json({ message: "Internal server error" });
    }
})

router.delete("/delete/:username", authMiddleware, async (req, res) => {
    try {
        const { username } = req.params;
        const member = await Users.findOneAndDelete({ userName: username });
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }
        res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
        
        errorLogger(error);
        res.status(500).json({ message: "Internal server error" });
    }
})  

router.put("/update/:username", authMiddleware, async (req, res) => {
    try {
        const { username } = req.params;
        const { newUsername, newEmail, newDesignation } = req.body;
        const member = await Users.findOneAndUpdate({ userName: username }, { userName: newUsername, email: newEmail, designation: newDesignation }, { new: true });
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }
        res.status(200).json({ message: "Member updated successfully", member });
    } catch (error) {
        
        errorLogger(error);
        res.status(500).json({ message: "Internal server error" });
    }
})
export default router;