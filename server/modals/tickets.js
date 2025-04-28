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
    sender: {
      type: String,
    },
    text: {
      type: String,
    }
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
    default: null, // Keep default as null
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ticketNo: {
    type: String,
  },
});

// Generate ticketNo before saving
querySchema.pre("save", async function (next) {
  if (!this.ticketNo) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const ms = today.getMilliseconds(); // Adds uniqueness

    this.ticketNo = `${year}-${month}${day}-${ms}`;
  }

  next(); // Call next after generating ticketNo
});

// Assign the query to an admin user after generating ticketNo
querySchema.pre("save", async function (next) {
  if (!this.assignedTo) {
    const adminUser = await mongoose.model("Users").findOne({ designation: "admin" });
    if (adminUser) {
      this.assignedTo = adminUser._id;
    }
  }

  next(); // Call next to continue with the save process
});

export default mongoose.model("Query", querySchema);
