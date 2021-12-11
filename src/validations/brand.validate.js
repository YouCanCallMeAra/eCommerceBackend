import Joi from "joi";
// import joiPassword from "joi-password";

const brandValidate = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  image: Joi.string().required(),
});

export default brandValidate;
