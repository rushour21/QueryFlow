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
      },
})

querySchema.pre("save", function (next) {
  if (!this.ticketNo) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const ms = today.getMilliseconds(); // makes it more unique

    this.ticketNo = `${year}-0${month}${day}-${ms}`;
  }
  next();
});


export default mongoose.model("Query", querySchema)