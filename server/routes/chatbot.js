import express from "express";
import Tickets from "../modals/tickets.js";
import { errorLogger } from "../middleware/log.js";
import ChatbotStyle from "../modals/chatbotStyle.js";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();


router.post("/style", async (req, res) => {
    try {
        const { 
            headerColor,
            backgroundColor,
            customizedText,
            introFields,
            welcomeText,
            chatTimer,
            } = req.body;
        exististingStyle = await ChatbotStyle.findOne({});
        if (exististingStyle) {
            exististingStyle.headerColor = headerColor;
            exististingStyle.backgroundColor = backgroundColor;
            exististingStyle.customizedText = customizedText;
            exististingStyle.introFields = introFields;
            exististingStyle.welcomeText = welcomeText;
            exististingStyle.chatTimer = chatTimer;
            await exististingStyle.save();
        } else {
            const newStyle = new ChatbotStyle({
                headerColor,
                backgroundColor,
                customizedText,
                introFields,
                welcomeText,
                chatTimer,
            });
            await newStyle.save();
        }
        
       res.status(201).json({ message: "Style created/updated successfully" });
    } catch (error) {
        console.error("Error creating style:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.get("/style", async (req, res) => {
    try {
        const style = await ChatbotStyle.findOne({});
        if (!style) {
            return res.status(404).json({ message: "Style not found" });
        }
        res.status(200).json({ style });
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