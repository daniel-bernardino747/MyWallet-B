import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { usersCollection, sessionsCollection } from '../database/index.js';

export async function registerClient(req, res) {
  const { name, email, password } = req.body;

  try {
    const hashPassword = bcrypt.hashSync(password, 10);

    await usersCollection.insertOne({ name, email, password: hashPassword });
    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const { user } = req;

  try {
    const token = uuid();
    await sessionsCollection.insertOne({ token, userId: user._id });

    return res.status(201).json({ token, user: user.name });
  } catch (err) {
    return res.sendStatus(500);
  }
}
