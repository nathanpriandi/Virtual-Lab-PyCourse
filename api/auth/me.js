import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default function handler(req, res) {
  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.auth_token;

    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const userProfile = jwt.verify(token, process.env.JWT_SECRET);

    res.status(200).json({ user: userProfile });

  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}