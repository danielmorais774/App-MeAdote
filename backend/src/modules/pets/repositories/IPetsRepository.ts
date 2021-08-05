import ICreatePetDTO from "../dtos/ICreatePetDTO";
import IFindAllPetDTO from "../dtos/IFindAllPetDTO";
import IFindLocationDTO from "../dtos/IFindLocationDTO";
import Pet from "../infra/typeorm/entities/Pet";

export default interface IPetsRepository{
    create(data: ICreatePetDTO): Promise<Pet>;
    findAllAndCount(data: IFindAllPetDTO) : Promise<{ data: Pet[], total: number }>;
    findByRecent(data: IFindLocationDTO) : Promise<Pet[]>;
    findById(id: string) : Promise<Pet | undefined>;
    findByTutorId(tutorId: string): Promise<Pet[]>;
    findByLocation(cityId: string) : Promise<Pet[]>;
    save(pet: Pet) : Promise<Pet>;
}