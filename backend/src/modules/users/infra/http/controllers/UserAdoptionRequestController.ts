import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import ListUserAdoptionRequestsService from "@modules/users/services/ListUserAdoptionRequestsService";
import CreateUserAdoptionRequestService from "@modules/users/services/CreateUserAdoptionRequestService";
import EditUserStatusAdoptionRequestService from "@modules/users/services/EditUserStatusAdoptionRequestService";


class UserAdoptionRequestController{
    public async index(req: Request, res: Response) : Promise<Response>{
        
        const userId = req.user.id;

        const listUserAdoptionRequestsService = container.resolve(ListUserAdoptionRequestsService);

        const adoptionRequests = await listUserAdoptionRequestsService.execute(userId);

        return res.json({ adoptionRequests: classToClass(adoptionRequests)});
    }

    public async create(req: Request, res: Response) : Promise<Response>{
        
        const userId = req.user.id;
        const { petId } = req.body;

        const createUserAdoptionRequestService = container.resolve(CreateUserAdoptionRequestService);

        const adoptionRequest = await createUserAdoptionRequestService.execute({
            userId,
            petId
        });

        return res.json({ adoptionRequest: classToClass(adoptionRequest)});
    }

    public async edit(req: Request, res: Response) : Promise<Response>{
        
        const userId = req.user.id;
        const { adoptionRequestId } = req.params;
        const { status } = req.body;

        const editUserStatusAdoptionRequestService = container.resolve(EditUserStatusAdoptionRequestService);

        const adoptionRequest = await editUserStatusAdoptionRequestService.execute({
            userId,
            id: adoptionRequestId,
            status: status.toUpperCase()
        });

        return res.json({ adoptionRequest: classToClass(adoptionRequest)});
    }
}

export default UserAdoptionRequestController;