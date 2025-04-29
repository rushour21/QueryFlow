import express from 'express';
import Users from '../modals/users.js';
import { errorLogger } from "../middleware/log.js";
import { authMiddleware } from "../middleware/auth.js";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

router.post("/addmember", authMiddleware,  async (req, res) => {
    try {
        const { userName, email, phone, designation } = req.body;
        console.log("Request body:", req.body);
        console.log("User ID:", req.user.id);
        const existingUser = await Users.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "this member is already added" });
        }
        const newMember = new Users({
            userName : userName,
            email : email,
            designation :  designation, 
            phone : phone,
            createdBy: req.user.id,
        });
        await newMember.save();

        console.log("New member object:", newMember);
        res.status(201).json({ message: "Member added successfully", userId: newMember._id });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

router.get("/", authMiddleware, async (req, res) => {
    try {
        const members =  await Users.find({ createdBy: req.user.id }).select("userName email designation phone");
        if (!members) {
            return res.status(404).json({ message: "No members found" });
        }
        res.status(200).json({ members });
    } catch (error) {
        
        errorLogger(error);
        res.status(500).json({ message: "Internal server error" });
    }
})
router.get("/addedmembers", authMiddleware, async (req, res) => {
    try {
      if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });
  
      let members = await Users.find({ createdBy: req.user.id }).select("userName email designation phone").lean();
      
      if (members.length === 0) {
        const creator = await Users.findById(req.user.id).select("createdBy").lean();
        if (creator?.createdBy) {
          members = await Users.find({ createdBy: creator.createdBy }).select("userName email designation phone").lean();
        }
      }
  
      return members.length 
        ? res.status(200).json({ success: true, members }) 
        : res.status(404).json({ success: false, message: "No members found" });
        
    } catch (error) {
      errorLogger(error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  });

router.delete("/delete/:_Id", authMiddleware, async (req, res) => {
    try {
        const { _Id } = req.params;
        const member = await Users.findOneAndDelete({ _id: _Id });
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }
        res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
        
        errorLogger(error);
        res.status(500).json({ message: "Internal server error" });
    }
})  

router.put("/update/:_id", authMiddleware, async (req, res) => {
    try {
        const { _id } = req.params;
        console.log("Updating member with ID:", _id);
        const { userName, email, designation, phone } = req.body;
        console.log(req.body);
        const member = await Users.findOneAndUpdate({ _id: _id }, { userName: userName, email: email, designation: designation, phone: phone }, { new: true });
        console.log("Member after update:", member);
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }
        console.log("Updated member object:", member);
        res.status(200).json({ message: "Member updated successfully", member });
    } catch (error) {
        
        errorLogger(error);
        res.status(500).json({ message: "Internal server error" });
    }
})

export default router;