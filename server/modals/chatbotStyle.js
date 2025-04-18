import mongoose from "mongoose";

const chatbotStyleSchema = new mongoose.Schema({
    headerColor: {
        type: String,
    },
    backgroundColor: {
        type: String,
    },
    customizedText: {
        type: [String],
    },
    introFields: {
       yourName: {
            type: String,
        },
        yourEmail: {
            type: String,
        },
        yourPhone: {
            type: String,
        },
    },
    welcomeText: {
        type: [String],
    },
    chatTimer: {
        type: Number,
    },
});


export default mongoose.model("ChatbotStyle", chatbotStyleSchema);