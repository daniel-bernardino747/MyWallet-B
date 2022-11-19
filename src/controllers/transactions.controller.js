import { sessionsCollection, transactionsCollection, usersCollection } from '../database.js';

export async function postTransaction(req, res) {
  const {
    date, value, details, type,
  } = req.body;
  const { authorization } = req.headers;

  const token = authorization?.replace('Bearer ', '');
  if (!token) return res.sendStatus(401);

  try {
    const session = await sessionsCollection.findOne({ token });
    const user = await usersCollection.findOne({ _id: session.userId });

    if (!user) return res.sendStatus(401);

    await transactionsCollection.insertOne({
      userId: user._id, date, value, details, type,
    });
    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function getAllTransaction(req, res) {
  const { authorization } = req.headers;

  const token = authorization?.replace('Bearer ', '');
  if (!token) return res.sendStatus(401);

  try {
    const session = await sessionsCollection.findOne({ token });
    const user = await usersCollection.findOne({ _id: session.userId });

    if (!user) return res.sendStatus(401);

    const allTransaction = await transactionsCollection.find({ userId: user._id }).toArray();

    return res.status(200).json({ message: allTransaction });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
