import { Request, Response } from 'express';
import * as AuthService from './auth.service.js';

export async function signupController(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string };
  const user = await AuthService.signup(email, password);
  res.status(201).json({ user });
}

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string };
  const { token } = await AuthService.login(email, password);
  res.json({ token });
}

export async function meController(req: Request, res: Response) {
  const profile = await AuthService.getProfile(req.user!.id);
  res.json({ user: profile });
}

