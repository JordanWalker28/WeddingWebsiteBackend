import Joi from 'joi';
import express from 'express';
import User from '../models/user';
import { signUp } from '../validations/user';
import { parseError, sessionizeUser } from "../util/helpers";

const userRouter = express.Router();
userRouter.post("", async (req, res) => {
  try {
    const { username } = req.body
    await Joi.validate({ username }, signUp);
    const newUser = new User({ username });
    const sessionUser = sessionizeUser(newUser);

    await newUser.save();
    req.session.user = sessionUser;

    res.send({ userId: newUser.id, username });
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});
export default userRouter;