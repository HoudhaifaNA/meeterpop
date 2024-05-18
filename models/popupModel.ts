import { Schema, model, models } from "mongoose";

import { PopupSchemaDB } from "@/types";

const popupSchema = new Schema<PopupSchemaDB>(
  {
    category: { type: String, required: [true, "Popup must have a category"] },
    sender: { type: String, required: [true, "Popup must have a sender"] },
    icon: { type: String, required: [true, "Popup must have a icon"] },
    title: { type: String, required: [true, "Popup must have a title"] },
    message: { type: String, required: [true, "Popup must have a message"] },
    time: { type: String, required: [true, "Popup must have a time"] },
    place: {
      type: String,
      enum: {
        values: ["top_right", "bottom_right", "top_left", "bottom_left"],
        message: "Place is either: top right/left, bottom right/left",
      },
      required: [true, "Popup must have a place"],
    },
    status: {
      type: String,
      enum: {
        values: ["default", "worrying", "dangerous"],
        message: "Status is either: default, worrying, dangerous",
      },
      required: [true, "Popup must have a status"],
    },
    isDisabled: {
      type: Boolean,
      required: [true, "Popup must have a visibility status"],
    },
    domain: {
      type: Schema.Types.ObjectId,
      ref: "Domain",
      required: [true, "Popup must have a domain"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Popup must have an owner"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Popup = models.Popup || model("Popup", popupSchema);
export default Popup;
