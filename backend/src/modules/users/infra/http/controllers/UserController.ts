import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import CreateUserService from "@modules/users/services/CreateUserService";
import ShowUserProfileById from "@modules/users/services/ShowUserProfileByIdService";
import UpdateUserProfileById from "@modules/users/services/UpdateUserProfileByIdService";


class UserController{
    public async create(req: Request, res: Response) : Promise<Response>{
        
        const { name, email, password, cityId, phone } = req.body;

        const createUserService = container.resolve(CreateUserService);

        const user = await createUserService.execute({name, email, password, cityId, phone});

        console.log(classToClass(user));

        return res.json({ user: classToClass(user)});
    }

    public async show(req: Request, res: Response) : Promise<Response>{

        const userId = req.user.id;
        
        const showUserProfileById = container.resolve(ShowUserProfileById);

        const user = await showUserProfileById.execute(userId);

        return res.json({ user: classToClass(user)});
    }

    public async update(req: Request, res: Response) : Promise<Response>{

        const userId = req.user.id;
        const { name, cityId, phone } = req.body;
        const avatar = req.file?.filename;

        const updateUserProfileById = container.resolve(UpdateUserProfileById);

        const user = await updateUserProfileById.execute(userId, {
            name,
            cityId,
            phone,
            avatar
        });

        return res.json({ user: classToClass(user)});
    }
}

export default UserController;