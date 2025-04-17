import mongoose from "mongoose";

const chatbotStyleSchema = new mongoose.Schema({
    headerColor: {
        type: String,
        required: true,
    },
    backgroundColor: {
        type: String,
        required: true,
    },
    customizedText: {
        type: [String],
        required: true,
    },
    introFields: {
       yourName: {
            type: String,
            required: true,
        },
        yourEmail: {
            type: String,
            required: true,
        },
        yourPhone: {
            type: String,
            required: true,
        },
    },
    welcomeText: {
        type: String,
        required: true,
    },
    chatTimer: {
        type: Number,
        required: true,
    },
});


export default mongoose.model("ChatbotStyle", chatbotStyleSchema);