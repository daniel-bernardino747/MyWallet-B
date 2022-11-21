import { sessionsCollection, usersCollection } from '../database/index.js';

import { NO_USER_FOUND, USER_NOT_LOGGED } from '../constants/errors.constants.js';

export default async function authValidate(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: USER_NOT_LOGGED });

  const session = await sessionsCollection.findOne({ token });
  if (!session) return res.status(401).json({ message: USER_NOT_LOGGED });

  const user = await usersCollection.findOne({ _id: session.userId });
  if (!user) return res.status(401).json({ message: NO_USER_FOUND });

  req.user = user;

  next();
}
