import jwt from 'jsonwebtoken';

const secret = 'your_secret_key';

export const generateToken = (user: any): string => {
  return jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1h' });
};

export const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
    req.userId = decoded.id;
    next();
  });
};
