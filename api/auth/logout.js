import cookie from 'cookie';

export default function handler(req, res) {
  res.setHeader('Set-Cookie', cookie.serialize('auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'lax',
      maxAge: -1,
      path: '/',
    })
  );

  res.status(200).json({ message: 'Logged out successfully' });
}