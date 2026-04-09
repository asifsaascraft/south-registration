import mongoose from "mongoose";

const RegisterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
    },
   
    address: {
      type: String,
      required: [true, "Address is required"],
    },

    city: {
      type: String,
      required: [true, "City is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: [true, "Mobile is required"],
      match: [/^\d{10}$/, "Mobile number must be 10 digits"],
      trim: true,
      unique: true,
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
    },

    profession: {
      type: String,
      required: [true, "Profession is required"],
    },

    visitingDay: {
      type: String,
      required: [true, "Visiting day is required"],
    },

    regNum: {
      type: String,
      unique: true,
    },

    generateQR: {
      type: Boolean,
      default: false,
    },

    // dayOne: {
    //   type: String,
    // },

    // dayTwo: {
    //   type: String,
    // },

    // dayThree: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

export default mongoose.models.Register ||
  mongoose.model("Register", RegisterSchema);
