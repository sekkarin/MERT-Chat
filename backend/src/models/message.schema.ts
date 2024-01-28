import { Schema, Types, model } from "mongoose";

const messageSchema = new Schema(
  {
    text: {
      type: String,
    },
    sender: {
      type: Types.ObjectId,
      ref: "User",
    },
    recipient: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Message", messageSchema);
