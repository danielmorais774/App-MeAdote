import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import ListUserPetAdoptionRequestsService from "@modules/users/services/ListUserPetAdoptionRequestsService";
import EditUserPetStatusAdoptionRequestService from "@modules/users/services/EditUserPetStatusAdoptionRequestService";

class UserPetAdoptionRequestController{
    public async index(req: Request, res: Response) : Promise<Response>{
        
        const userId = req.user.id;

        const listUserPetAdoptionRequestsService = container.resolve(ListUserPetAdoptionRequestsService);

        const adoptionRequests = await listUserPetAdoptionRequestsService.execute(userId);

        return res.json({ adoptionRequests: classToClass(adoptionRequests)});
    }

    public async edit(req: Request, res: Response) : Promise<Response>{
        
        const userId = req.user.id;
        const { adoptionRequestId } = req.params;
        const { status } = req.body;

        const editUserPetStatusAdoptionRequestService = container.resolve(EditUserPetStatusAdoptionRequestService);

        const adoptionRequest = await editUserPetStatusAdoptionRequestService.execute({
            userId,
            id: adoptionRequestId,
            status: status.toUpperCase()
        });

        return res.json({ adoptionRequest: classToClass(adoptionRequest)});
    }
}

export default UserPetAdoptionRequestController;