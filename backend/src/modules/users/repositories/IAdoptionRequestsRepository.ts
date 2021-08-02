import ICreateAdoptionRequestDTO from "../dtos/ICreateAdoptionRequestDTO";
import IEditAdoptionRequestDTO from "../dtos/IEditAdoptionRequestDTO";
import AdoptionRequest from "../infra/typeorm/entities/AdoptionRequest";

export default interface IAdoptionRequestsRepository{
    create(data: ICreateAdoptionRequestDTO): Promise<AdoptionRequest>;
    findAllByUser(userId: string): Promise<AdoptionRequest[]>;
    findById(id: string): Promise<AdoptionRequest | undefined>;
    findReceiverByUserPet(userId: string): Promise<AdoptionRequest[]>;
    editStatusById(data: IEditAdoptionRequestDTO): Promise<AdoptionRequest>;
}