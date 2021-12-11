import Joi from "joi";
// import joiPassword from "joi-password";

const userValidate = Joi.object({
  username: Joi.string().min(3).max(25).required(),
  email: Joi.string().email().min(10).max(40).required(),
  password: Joi.string().min(8).max(15).required(),
});

export default userValidate;
