import { ObjectId } from 'mongodb';
import SUCCESS_DELETED from '../constants/sucess.constants.js';
import { transactionsCollection } from '../database/index.js';

export async function postTransaction(req, res) {
  const {
    date, value, details, type,
  } = req.body;
  const { user } = req;

  try {
    await transactionsCollection.insertOne({
      userId: user._id, date, value, details, type,
    });
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

export async function getAllTransaction(req, res) {
  const { user, balance } = req;

  try {
    const allTransaction = await transactionsCollection.find({ userId: user._id }).toArray();

    return res.status(200).json({ message: { data: allTransaction, balance } });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

export async function deleteOneTransaction(req, res) {
  const { id } = req.params;

  try {
    await transactionsCollection.deleteOne({ _id: ObjectId(id) });
    res.status(200).json({ message: SUCCESS_DELETED });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
