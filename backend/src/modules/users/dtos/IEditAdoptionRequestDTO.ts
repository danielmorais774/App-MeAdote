import { Status } from "../infra/typeorm/entities/AdoptionRequest";

export default interface IEditAdoptionRequestDTO{
    id: string;
    status: Status;
}