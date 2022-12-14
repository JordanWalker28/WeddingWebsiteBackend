import express from "express";
import Joi from "joi";
import User from "../models/user";
import { signIn } from "../validations/user";
import { parseError, sessionizeUser } from "../util/helpers";
import { SESS_NAME } from "../config";
const sessionRouter = express.Router();

sessionRouter.post("", async (req, res) => {
    try {
      const { username } = req.body
      await Joi.validate({ username }, signIn);
      const user = await User.findOne({ username });
      if (user) {
        const sessionUser = sessionizeUser(user);
        req.session.user = sessionUser
        res.send(sessionUser);
      } else {
        throw new Error('Invalid login credentials');
      }
    } catch (err) {
      res.status(401).send(parseError(err));
    }
  });

sessionRouter.delete("", ({ session }, res) => {
  try {
    const user = session.user;
    if (user) {
      session.destroy(err => {
        if (err) throw (err);
        res.clearCookie(SESS_NAME);
        res.send(user);
      });
    } else {
      throw new Error('Something went wrong');
    }
  } catch (err) {
    res.status(422).send(parseError(err));
  }
});

sessionRouter.get("", ({ session: { user }}, res) => {
  res.send({ user });
});
export default sessionRouter;