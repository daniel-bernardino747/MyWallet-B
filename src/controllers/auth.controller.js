import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { usersCollection, sessionsCollection } from '../database.js';

export async function registerClient(req, res) {
  const { name, email, password } = req.body;

  const hashPassword = bcrypt.hashSync(password, 10);
  try {
    await usersCollection.insertOne({ name, email, password: hashPassword });
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  console.log(req.body);
  const { email, password } = req.body;
  const token = uuid();

  try {
    const existingUser = await usersCollection.findOne({ email });
    if (!existingUser) return res.sendStatus(401);

    const correctPassword = bcrypt.compare(password, existingUser.password);
    if (!correctPassword) return res.sendStatus(401);

    await sessionsCollection.insertOne({ token, userId: existingUser._id });

    return res.status(201).json({ token });
  } catch (err) {
    return res.sendStatus(500);
  }
}
