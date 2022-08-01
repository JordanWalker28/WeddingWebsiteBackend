import Joi from 'joi';
const username = Joi.string().alphanum().min(3).max(30).required();
const diet = "";

export const signUp = Joi.object().keys({
  username,
  diet
});
export const signIn = Joi.object().keys({
  username

});