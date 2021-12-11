import Mongoose from "mongoose";

const BrandSchema = new Mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const BrandsModel = new Mongoose.model("brand", BrandSchema);
export default BrandsModel;
