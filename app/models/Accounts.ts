import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const AccountsSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
    },
    provider: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Accounts || mongoose.model("Accounts", AccountsSchema);
