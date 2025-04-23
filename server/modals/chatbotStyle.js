import mongoose from "mongoose";

const chatbotStyleSchema = new mongoose.Schema({
    headerColor: {
        type: String,
    },
    backgroundColor: {
        type: String,
    },
    customizedText: {
        first:{
            type : String
        },
        second:{
            type: String,
        }
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
        type: String,
    },
    chatTimer: {
        type: String,
    },
});


export default mongoose.model("ChatbotStyle", chatbotStyleSchema);