import { transactionsCollection } from '../database.js';

export async function postTransaction(req, res) {
  const {
    date, value, details, type,
  } = req.body;
  const { user } = req.details;

  try {
    await transactionsCollection.insertOne({
      userId: user._id, date, value, details, type,
    });
    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function getAllTransaction(req, res) {
  const { user } = req.details;

  try {
    const allTransaction = await transactionsCollection.find({ userId: user._id }).toArray();

    return res.status(200).json({ message: allTransaction });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
