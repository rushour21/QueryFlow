import mongoose from "mongoose";

const users = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        unique: true,
        sparse: true
    },
    password: {
        type: String,
    },
    userName: {
        type: String,
        unique: true,
        sparse: true
    },
    preference: {
        type: String,
    },
    designation: {
        type: String,
        enum: ['admin', 'member', "admin1"],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
export default mongoose.model('Users', users)