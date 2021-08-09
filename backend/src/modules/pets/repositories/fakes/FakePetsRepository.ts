import ICreatePetDTO from "@modules/pets/dtos/ICreatePetDTO";
import Pet, { Gender } from "@modules/pets/infra/typeorm/entities/Pet";
import { uuid } from "uuidv4";
import IPetsRepository from "../IPetsRepository";


interface IResponseFindAndCount{
    data: Pet[],
    total: number
}

class FakePetsRepository implements IPetsRepository{

    private pets: Pet[] = [];

    public async findAllAndCount(): Promise<IResponseFindAndCount>{
        return {
            data: this.pets,
            total: this.pets.length
        };
    }

    public async findByRecent(): Promise<Pet[]>{
        return this.pets.sort((a,b)=> new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    public async findById(id: string): Promise<Pet | undefined>{
       return this.pets.find(pet => pet.id === id);
    }

    public async findByTutorId(tutorId: string): Promise<Pet[]>{
        return this.pets.filter(pet => pet.tutor_id === tutorId);
    }

    public async findByLocation(cityId: string): Promise<Pet[]>{
        return this.pets;
    }

    public async create({ name, gender, age, color, breedId, tutorId }: ICreatePetDTO): Promise<Pet>{
        const pet = new Pet();
        pet.id = uuid();
        pet.name = name;
        pet.gender = Gender[gender];
        pet.color = color;
        pet.breed_id = breedId;
        pet.age = age;
        pet.tutor_id = tutorId;
        pet.created_at = new Date();
        this.pets.push(pet);
        return pet;
    }

    public async save(pet: Pet): Promise<Pet>{
        const findIndex = this.pets.findIndex(
            findPet => findPet.id === pet.id,
        );
      
        this.pets[findIndex] = pet;
      
        return pet;
    }

    public async delete(pet: Pet): Promise<void>{
        this.pets = this.pets.filter(
            findPet => findPet.id !== pet.id,
        );
    }

}

export default FakePetsRepository;