import ICreatePetImageDTO from "../dtos/ICreatePetImageDTO";
import PetImage from "../infra/typeorm/entities/PetImage";

export default interface IPetImagesRepository{
    create(data: ICreatePetImageDTO): Promise<PetImage>;
}