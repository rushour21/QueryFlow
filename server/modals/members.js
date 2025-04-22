import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    designation: {
        type: String,
        required: true,
        enum: ['admin', 'member']
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});
export default mongoose.model('Member', memberSchema);
