import Mongoose from "mongoose";

const CategorySchema = new Mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const CategoriesModel = Mongoose.model("category", CategorySchema);
export default CategoriesModel;
