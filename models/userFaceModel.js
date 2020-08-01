const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    user_id: { type: Number, required: true },
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    name: { type: String, required: true },
    dob: { type: Date },
    friends: [Number],
  },
  {
    collection: "User",
    versionKey: false,
  }
);

const user = mongoose.model("User", userSchema);

module.exports = user;
