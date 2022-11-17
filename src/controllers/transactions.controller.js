import { sessionsCollection, transactionsCollection, usersCollection } from '../server.js';

export async function postTransaction(req, res) {
  const {
    date, value, details, type,
  } = req.body;
  const { authorization } = req.headers;

  const token = authorization?.replace('Bearer ', '');
  if (!token) return res.sendStatus(401);

  try {
    const session = sessionsCollection.findOne({ token });
    const user = usersCollection.findOne({ _id: session.userId });

    if (!user) return res.sendStatus(401);

    await transactionsCollection.insertOne({
      date, value, details, type,
    });
    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export const bla = '';
