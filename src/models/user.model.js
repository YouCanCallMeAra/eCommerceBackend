// import { boolean } from "joi";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//mongoose.model("User", // name of collection in the db must be capital and singular
const UsersModel = mongoose.model("User", UserSchema);
export default UsersModel;
