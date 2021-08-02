import ICreateBreedDTO from "../dtos/ICreateBreedDTO";
import Breed from "../infra/typeorm/entities/Breed";

export default interface IBreedsRepository{
    findById(id: string): Promise<Breed | undefined>;
    create(data: ICreateBreedDTO): Promise<Breed>;
}