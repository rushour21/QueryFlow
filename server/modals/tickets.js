import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
    userDetails: {
        name: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
      },
      initialMessage: {
        type: String,
        required: true,
      },
      messages: [
        {
          sender: {
            type: String,
            enum: ["user", "admin", "member"],
            required: true,
          },
          text: {
            type: String,
            required: true,
          },
          timestamp: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      status: {
        type: String,
        enum: ["Pending", "Unresolved", "Resolved"],
        default: "Pending",
      },
      assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      ticketNo: {
        type: String,
        unique: true,
        required: true,
      },
})

querySchema.pre("save", function (next) {
  if (!this.ticketNo) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // 1-based month
    const day = String(today.getDate()).padStart(3, "0"); // pad day to 3 digits
    this.ticketNo = `${year}-0${month}${day}`;
  }
  next();
});
export default mongoose.model("Query", querySchema)