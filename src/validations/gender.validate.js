import Joi from "joi";
// import joiPassword from "joi-password";

const genderValidate = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  image: Joi.string().required(),
});

export default genderValidate;
