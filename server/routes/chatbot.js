import express from "express";
import Tickets from "../modals/tickets.js";
import { errorLogger } from "../middleware/log.js";
import ChatbotStyle from "../modals/chatbotStyle.js";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();


router.put("/style", async (req, res) => {
    try {
      const {chatbotStyle} = req.body;
      const Id = "6809345b22ef2817b049173d"
      const updatedstyle = await ChatbotStyle.findOneAndUpdate({}, chatbotStyle  ,{ new: true, upsert: true })
      console.log(chatbotStyle)
      res.status(200).json({ updatedstyle });
      console.log(updatedstyle)
    } catch (error) {
      console.error("Error updating style:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
          
})

router.get("/getstyle", async (req, res) => {
    try {
        const style = await ChatbotStyle.findOne({});
        if (!style) {
            return res.status(404).json({ message: "Style not found" });
        }
        res.status(200).json({ style });
        console.log(style);
    } catch (error) {
        console.error("Error fetching style:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.get("/chatbot", async (req, res) => {
    try {
        const tickets = await Tickets.find({});
        if (!tickets) {
            return res.status(404).json({ message: "No tickets found" });
        }
        res.status(200).json({ tickets });
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})



export default router;