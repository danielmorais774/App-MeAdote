import ICreatePetImageDTO from "../dtos/ICreatePetImageDTO";
import PetImage from "../infra/typeorm/entities/PetImage";

export default interface IPetImagesRepository{
    findById(id: string): Promise<PetImage | undefined>;
    create(data: ICreatePetImageDTO): Promise<PetImage>;
    delete(petImage: PetImage): Promise<void>;
}