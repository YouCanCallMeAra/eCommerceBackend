import Joi from "joi";
// import joiPassword from "joi-password";

const productValidate = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  category: Joi.string().required(),
  brand: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number(),
});

export default productValidate;