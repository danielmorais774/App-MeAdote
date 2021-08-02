import { Status } from "../infra/typeorm/entities/AdoptionRequest";

export default interface ICreateAdoptionRequestDTO{
    petId: string;
    userId: string;
    status?: Status;
}