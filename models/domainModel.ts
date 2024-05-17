import { Schema, model, models } from "mongoose";

import { DomainSchemaDB } from "@/types";
import { DOMAIN_REGEX } from "@/constants";

const domainSchema = new Schema<DomainSchemaDB>(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      validate: {
        validator: function (val: string) {
          return DOMAIN_REGEX.test(val);
        },
        message: "Please, enter a valid domain",
      },
    },
    startingTime: {
      type: Number,
      required: [true, "Domain must have an starting time"],
      default: 1000,
    },
    intervalTime: {
      type: Number,
      required: [true, "Domain must have an interval time"],
      default: 1000,
    },
    endTime: {
      type: Number,
      required: [true, "Domain must have an end time"],
      default: 4000,
    },
    popups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Popup",
        required: [true, "Popup must be an id"],
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Domain must have an owner"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Domain = models.Domain || model("Domain", domainSchema);

export default Domain;
