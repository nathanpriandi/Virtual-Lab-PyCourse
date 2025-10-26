import { google } from 'googleapis';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function handler(req, res) {
  const code = req.query.code;

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.APP_BASE_URL}/api/auth/callback`
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });
    const { data } = await oauth2.userinfo.get();
    const userProfile = {
      userId: data.id,
      email: data.email,
      name: data.name,
      picture: data.picture,
    };

    const sessionToken = jwt.sign(userProfile, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.setHeader('Set-Cookie', cookie.serialize('auth_token', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })
    );

    res.redirect(302, '/');

  } catch (error) {
    console.error('Gagal saat callback Google OAuth:', error);
    res.redirect(302, '/?error=auth_failed');
  }
}