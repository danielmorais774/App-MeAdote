import { uuid } from "uuidv4";

import PetImage from "@modules/pets/infra/typeorm/entities/PetImage";

import ICreatePetImageDTO from "@modules/pets/dtos/ICreatePetImageDTO";
import IPetImagesRepository from "../IPetImagesRepository";

class FakePetImagesRepository implements IPetImagesRepository{
    private petImages: PetImage[] = [];

    public async findById(id: string): Promise<PetImage | undefined>{
        return this.petImages.find(petImage => petImage.id === id);
    }

    public async create({ path, petId }: ICreatePetImageDTO): Promise<PetImage>{
        const petImage = new PetImage();
        petImage.id = uuid();
        petImage.path = path;
        petImage.pet_id = petId;
        
        this.petImages.push(petImage);
        return petImage;
    }

    public async delete(petImage: PetImage): Promise<void>{
        this.petImages = this.petImages.filter(item => item.id !== petImage.id);
    }
}

export default FakePetImagesRepository;