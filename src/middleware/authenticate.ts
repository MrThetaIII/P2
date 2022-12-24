import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authorize = (_req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader: string = _req.headers['authorization'] as string;
		const token = authHeader.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
		_req.body.user = decoded;
		next();
	} catch (err) {
		res.status(401).json({ message: 'Failed authentication' });
	}
};

export default authorize;
