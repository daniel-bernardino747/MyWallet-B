import bcrypt from 'bcrypt';
import { EMAIL_IN_USE, INCORRECT_AUTH } from '../constants/errors.constants.js';
import { usersCollection } from '../database.js';

export async function existingUserValidate(req, res, next) {
  const { email } = req.body;

  try {
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) return res.status(401).json({ error: EMAIL_IN_USE });
  } catch (error) {
    return res.status(500).json({ error });
  }
  return next();
}

export async function incorrectUserValidate(req, res, next) {
  const { email, password } = req.body;

  try {
    const existingUser = await usersCollection.findOne({ email });
    if (!existingUser) return res.status(401).json({ error: INCORRECT_AUTH });

    const correctPassword = await bcrypt.compare(password, existingUser.password);
    if (!correctPassword) return res.status(401).json({ error: INCORRECT_AUTH });

    req.details.user = existingUser;
  } catch (error) {
    return res.status(500).json({ error });
  }
  return next();
}