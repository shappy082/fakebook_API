const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    user_id: { type: Number, required: true },
    user_id_req: { type: Number, required: true },
    flag_submit: { type: Number, default: 0 },
  },
  {
    collection: "Friend_Req",
    versionKey: false,
  }
);
const friendRequest = mongoose.model("Friend_Req", schema);

module.exports = friendRequest;
