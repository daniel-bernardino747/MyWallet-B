import bcrypt from 'bcrypt';

import { transactionsCollection, usersCollection } from '../database/index.js';
import { EMAIL_IN_USE, INCORRECT_AUTH } from '../constants/errors.constants.js';

export async function existingUserValidate(req, res, next) {
  const { email } = req.body;

  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) return res.status(401).json({ error: EMAIL_IN_USE });

  next();
}

export async function incorrectUserValidate(req, res, next) {
  const { email, password } = req.body;

  const existingUser = await usersCollection.findOne({ email });
  if (!existingUser) return res.status(401).json({ error: INCORRECT_AUTH });

  const correctPassword = await bcrypt.compare(password, existingUser.password);
  if (!correctPassword) return res.status(401).json({ error: INCORRECT_AUTH });

  req.user = existingUser;

  next();
}

export async function balanceOfUserTransactions(req, res, next) {
  const { user } = req;

  const allDeposits = await transactionsCollection.find({ type: 'deposit', userId: user._id }).toArray();
  const allWithdrawal = await transactionsCollection.find({ type: 'withdrawal', userId: user._id }).toArray();

  const allValuesDeposits = allDeposits.map((obj) => obj.value);
  const allValuesWithdrawal = allWithdrawal.map((obj) => obj.value);

  const sumDeposits = (allValuesDeposits.length > 0)
    ? allValuesDeposits.reduce((sum, value) => sum + value)
    : 0;

  const sumWithdrawal = (allValuesWithdrawal.length > 0)
    ? allValuesWithdrawal.reduce((sum, value) => sum + value)
    : 0;

  const balance = sumDeposits - sumWithdrawal;
  req.balance = balance;

  next();
}
