import { Request, response, Response } from "express";
import { container } from "tsyringe";

import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
import { classToClass } from "class-transformer";

export default class AuthController{
    public async create(req: Request, res: Response) : Promise<Response>{
        
        const { email, password } = req.body;

        const authenticateUser = container.resolve(AuthenticateUserService);

        const { user, token } = await authenticateUser.execute({email: email, password: password});

        return res.json({ user: classToClass(user), token });
    }
}