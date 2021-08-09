import { uuid } from 'uuidv4';

import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "@modules/users/infra/typeorm/entities/User";
import IAdoptionRequestsRepository from '../IAdoptionRequestsRepository';
import AdoptionRequest, { Status } from '@modules/users/infra/typeorm/entities/AdoptionRequest';
import ICreateAdoptionRequestDTO from '@modules/users/dtos/ICreateAdoptionRequestDTO';
import IEditAdoptionRequestDTO from '@modules/users/dtos/IEditAdoptionRequestDTO';

class FakeAdoptionRequestsRepository implements IAdoptionRequestsRepository{

    private adoptionRequest: AdoptionRequest[] = [];

    public async findAllByUser(userId: string): Promise<AdoptionRequest[]>{
        return this.adoptionRequest;
    }

    public async findById(id: string): Promise<AdoptionRequest | undefined >{
        return this.adoptionRequest.find(item => item.id === id);
    }

    public async findByPetIdAndUserId(petId: string, userId: string): Promise<AdoptionRequest | undefined >{
        return this.adoptionRequest.find(item => item.pet_id === petId && item.user_id === userId);
    }

    public async findReceiverByUserPet(userId: string): Promise<AdoptionRequest[]>{
        return this.adoptionRequest;
    }

    public async create({ userId, petId, status = Status.REQUESTED }: ICreateAdoptionRequestDTO): Promise<AdoptionRequest>{
        const request = new AdoptionRequest();
        request.id = uuid();
        request.pet_id = petId;
        request.user_id = userId;
        request.status = status;
        request.created_at = new Date();
        request.updated_at = new Date();
        this.adoptionRequest.push(request);
        return request;
    }

    public async editStatusById(data: IEditAdoptionRequestDTO): Promise<AdoptionRequest>{
        const adoptionRequest = this.adoptionRequest.find(item => item.id === data.id);
        
        if(adoptionRequest){
            return {...adoptionRequest, status: data.status};
        }

        return {} as AdoptionRequest;
    }

    public async deleteRequestsByPetId(petId: string): Promise<void>{
        this.adoptionRequest = this.adoptionRequest.filter(item => item.id !== petId);
    }

}

export default FakeAdoptionRequestsRepository;