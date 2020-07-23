const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    user_id: { type: String, required: true, trim: true },
    user_id_req: { type: String, trim: true },
    flag_submit: { type: Number, default: 0 },
  },
  {
    collection: "Friend_Req",
  }
);
const friendRequest = mongoose.model("Friend_Req", schema);

module.exports = friendRequest;
