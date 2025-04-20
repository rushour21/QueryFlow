import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import ticketRoutes from "./routes/ticket.js";
import memberRoutes from "./routes/member.js";
import chatbotRoutes from "./routes/chatbot.js";
import { errorLogger} from "./middleware/log.js";
import  log  from "./middleware/log.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(log);
app.use(errorLogger);
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/chatbot', chatbotRoutes);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
connectDB();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});



