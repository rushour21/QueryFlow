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
        const { details, initialMessage} = req.body
        const newTicket = new Tickets({
           userDetails: details,
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
        console.log(message)
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
        console.log(message)
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

router.get("/allchats/:ticketId", async (req, res) => {
    try {
        const { ticketId } = req.params;
        const allChats = await Tickets.findOne({ _id: ticketId }).select("userDetails messages initialMessage");
        console.log(ticketId)
        return res.status(200).json({allChats });
    } catch (error) {
        
        console.error("Error fetching chats:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})
router.get("/getallTickets", authMiddleware, errorLogger, async (req, res) => {
    try {
        const allTickets = await Tickets.find({})

        return res.status(200).json({ tickets: allTickets });
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

router.put("/status/:ticketId", authMiddleware, async (req,res) => {
    try {
        const { ticketId } = req.params;
        const { status } = req.body;
        console.log(status);
        console.log(ticketId);
        const ticket = await Tickets.findOneAndUpdate(
            {_id : ticketId },
             {status:status},
             { new: true } 
            )
        console.log(ticket);
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });
        res.status(200).json({ message: "Status updated successfully", ticket });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
})

router.put("/assign/:ticketId",authMiddleware, async(req,res) =>{
    try {
        const { ticketId } = req.params;
        const { assigningMember } = req.body;
        console.log(assigningMember);
        console.log(ticketId);
        const ticket = await Tickets.findOneAndUpdate(
            {_id : ticketId },
             {assignedTo:assigningMember},
             { new: true }
        )
        console.log(ticket)
        res.status(200).json({ message: "assigned successfully", ticket });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
} )

router.get("/analysis", authMiddleware, async (req, res) => {
    try {
      // Get user ID from request
      const userId = req.user.id;
      console.log(userId)
      
      // Get tickets assigned to this user
      const userTickets = await Tickets.find({ assignedTo: userId });
  
      // Count total and resolved tickets for this user
      const totalTickets = userTickets.length;
      const resolvedTickets = await Tickets.countDocuments({ 
        assignedTo: userId,
        status: "Resolved" 
      });
  
      // Calculate resolved percentage
      const resolvedPercentage = totalTickets > 0 
        ? (resolvedTickets / totalTickets) * 100 
        : 0;
  
      // Calculate average response time and track missed chats
      let totalResponseTime = 0;
      let countedTickets = 0;
      const missedChats = [];
      const oneHourInMs = 60 * 60 * 1000; // 1 hour in milliseconds
      const currentTime = new Date();
  
      for (const ticket of userTickets) {
        const initialTime = new Date(ticket.createdAt);
        const adminMessage = ticket.messages.find(msg => msg.sender === "admin");
  
        if (adminMessage) {
          const adminTime = new Date(adminMessage.timestamp);
          const responseTime = adminTime - initialTime;
          
          totalResponseTime += responseTime;
          countedTickets++;
          
          // Check if response time is more than an hour
          if (responseTime > oneHourInMs) {
            missedChats.push({
              ticketId: ticket._id,
              createdAt: ticket.createdAt,
              responseTimeMinutes: (responseTime / (1000 * 60)).toFixed(2),
              hasResponse: true
            });
          }
        } else {
          // No admin response - calculate time since creation
          const timeSinceCreation = currentTime - initialTime;
          
          // If it's been more than an hour with no response, consider it missed
          if (timeSinceCreation > oneHourInMs) {
            missedChats.push({
              ticketId: ticket._id,
              createdAt: ticket.createdAt,
              timeWithoutResponseMinutes: (timeSinceCreation / (1000 * 60)).toFixed(2),
              hasResponse: false
            });
          }
        }
      }
  
      const averageResponseTimeMinutes = countedTickets > 0
        ? totalResponseTime / countedTickets / (1000 * 60)
        : 0;
  
      // Send JSON response
      return res.status(200).json({
        totalTickets,
        resolvedTickets,
        resolvedPercentage: resolvedPercentage.toFixed(2),
        averageResponseTimeMinutes: averageResponseTimeMinutes.toFixed(2),
        missedChats: {
          count: missedChats.length,
          tickets: missedChats
        }
      });
  
    } catch (error) {
      console.error("Error in /analysis route:", error);
      return res.status(500).json({ error: "Server error while generating analysis." });
    }
  });

export default router