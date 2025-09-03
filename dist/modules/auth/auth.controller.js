import * as AuthService from './auth.service.js';
export async function signupController(req, res) {
    const { email, password } = req.body;
    const user = await AuthService.signup(email, password);
    res.status(201).json({ user });
}
export async function loginController(req, res) {
    const { email, password } = req.body;
    const { token } = await AuthService.login(email, password);
    res.json({ token });
}
export async function meController(req, res) {
    const profile = await AuthService.getProfile(req.user.id);
    res.json({ user: profile });
}
