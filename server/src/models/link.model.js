import mongoose, { Schema, model } from "mongoose";

let linkSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    chicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

let linkModel = model('links',linkSchema)