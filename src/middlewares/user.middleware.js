import bcrypt from 'bcrypt';

import { usersCollection } from '../database/index.js';
import { EMAIL_IN_USE, INCORRECT_AUTH } from '../constants/errors.constants.js';

export async function existingUserValidate(req, res, next) {
  const { email } = req.body;

  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) return res.status(401).json({ error: EMAIL_IN_USE });

  return next();
}

export async function incorrectUserValidate(req, res, next) {
  const { email, password } = req.body;

  const existingUser = await usersCollection.findOne({ email });
  if (!existingUser) return res.status(401).json({ error: INCORRECT_AUTH });

  const correctPassword = await bcrypt.compare(password, existingUser.password);
  if (!correctPassword) return res.status(401).json({ error: INCORRECT_AUTH });

  req.user = existingUser;

  return next();
}
