import express from "express";
import Tickets from "../modals/tickets.js";
import { errorLogger } from "../middleware/log.js";
import ChatbotStyle from "../modals/chatbotStyle.js";
import dotenv from "dotenv";
import { authMiddleware } from "../middleware/auth.js";  
dotenv.config();
const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        console.log(req.body)
        const { name, phone, email, initialMessage} = req.body
        if (!name || !phone || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newTicket = new Tickets({
           userDetails: {
                name: name,
                phone: phone,
                email: email,
            },
            messages: [{
                sender: "user",
                text: initialMessage,
                timestamp: new Date(),
            }],
            status: "Pending",
            initialMessage: initialMessage,
        });
        await newTicket.save();
        return res.status(201).json({ message: "Ticket created successfully", ticket: newTicket._id });
    } catch (error) {
        console.error("Error creating ticket:", error);
        return res.status(500).json({ message: "Internal server error" });

    }
})

router.put("/usermessage/:ticketId", async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ message: "Message is required" });
        }
        const ticket = await Tickets.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        ticket.messages.push({
            sender: "user",
            text: message,
            timestamp: new Date(),
        });
        await ticket.save();
        return res.status(200).json({ message: "Ticket updated successfully", ticket });
    } catch (error) {
        console.error("Error updating ticket:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.put("/adminmessage/:ticketId", async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ message: "Message is required" });
        }
        const ticket = await Tickets.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        ticket.messages.push({
            sender: "admin",
            text: message,
            timestamp: new Date(),
        });
        await ticket.save();
        return res.status(200).json({ message: "Ticket updated successfully", ticket });
    } catch (error) {
        console.error("Error updating ticket:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.get("/allTickets", authMiddleware, errorLogger, async (req, res) => {
    try {
        const allTickets = await Tickets.find({})
            .select("userDetails createdBy createdAt ticketNo status messages")

        // If you only want the **first message**, map through and pick it
        const simplified = allTickets.map(ticket => ({
            userDetails: ticket.userDetails,
            createdBy: ticket.createdBy,
            createdAt: ticket.createdAt,
            ticketNo: ticket.ticketNo,
            status: ticket.status,
            firstMessage: ticket.messages?.[0] || null
        }));

        return res.status(200).json({ tickets: simplified });
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/resolved", authMiddleware, errorLogger, async (req, res) => {
    try {
        const allTickets = await Tickets.find({ status: "Resolved" })
            .select("userDetails createdBy createdAt ticketNo status messages");

        // If you only want the **first message**, map through and pick it
        const simplified = allTickets.map(ticket => ({
            userDetails: ticket.userDetails,
            createdBy: ticket.createdBy,
            createdAt: ticket.createdAt,
            ticketNo: ticket.ticketNo,
            status: ticket.status,
            firstMessage: ticket.messages?.[0] || null
        }));

        return res.status(200).json({ tickets: simplified });
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/unresolved", authMiddleware, errorLogger, async (req, res) => {
    try {
        const allTickets = await Tickets.find({ status: "Unresolved" })
            .select("userDetails createdBy createdAt ticketNo status messages");

        // If you only want the **first message**, map through and pick it
        const simplified = allTickets.map(ticket => ({
            userDetails: ticket.userDetails,
            createdBy: ticket.createdBy,
            createdAt: ticket.createdAt,
            ticketNo: ticket.ticketNo,
            status: ticket.status,
            firstMessage: ticket.messages?.[0] || null
        }));

        return res.status(200).json({ tickets: simplified });
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/allchats/:ticketId", authMiddleware, errorLogger, async (req, res) => {
    try {
        const { ticketId } = req.params;
        const allChats = await Tickets.find({ _id: ticketId }).select("userDetails ticketNo status messages");
        
        return res.status(200).json({ chats: allChats });
    } catch (error) {
        
        console.error("Error fetching chats:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

export default router