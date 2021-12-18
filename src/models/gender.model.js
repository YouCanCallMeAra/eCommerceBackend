import Mongoose from "mongoose";

const GenderSchema = new Mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const GenderModel = new Mongoose.model("gender", GenderSchema);
export default GenderModel;
