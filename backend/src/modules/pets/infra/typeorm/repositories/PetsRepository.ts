import paginate from "@config/paginate";
import City from "@modules/cities/infra/typeorm/entities/City";
import ICreatePetDTO from "@modules/pets/dtos/ICreatePetDTO";
import IFindAllPetDTO from "@modules/pets/dtos/IFindAllPetDTO";
import IFindLocationDTO from "@modules/pets/dtos/IFindLocationDTO";
import IPetsRepository from "@modules/pets/repositories/IPetsRepository";
import { createQueryBuilder, getRepository, Repository } from "typeorm";

import Pet, { Gender } from "../entities/Pet";
import PetImage from "../entities/PetImage";


interface IResponseFindAndCount{
    data: Pet[],
    total: number
}


class PetsRepository implements IPetsRepository{

    private petsRepository: Repository<Pet>;

    constructor(){
        this.petsRepository = getRepository(Pet);
    }

    public async findAllAndCount({ cityId, page, limit }: IFindAllPetDTO): Promise<IResponseFindAndCount>{
    
        let pets = createQueryBuilder(Pet, "pets")
            .leftJoinAndSelect("pets.user", "user", "user.id = pets.tutor_id")
            .leftJoin('pets.breed', 'breed')
            .leftJoin("user.city", "city")
            .skip((page - 1) * limit)
            .orderBy('pets.id', 'ASC')
            .select([
                'pets.id as id', 
                'pets.name as name',
                'pets.age as age',
                'pets.gender as gender',
                'pets.color as color',
                'breed.name as breed',
                // 'pets.breed as breed',
                'pets.user',
                'city.name AS location',
                'pets.created_at as created_at'
            ])
            .addSelect(subQuery => {
                return subQuery.select('pet_images.path', 'image').from(PetImage, 'pet_images').where('pet_images.pet_id = pets.id').limit(1);
            })
            .take(limit);
            
        if(cityId){
            pets = pets.where("user.city_id = :cityId", { cityId: cityId });
        }

        // console.log(await pets.getRawOne());

        let data = await pets.getRawMany();
        const total = await pets.getCount();


        data = data.map((pet) => {
            return pet.image ? {...pet, image: `${process.env.APP_IMAGE_URL}/files/${pet.image}`} : null;
        });

        return {
            data,
            total
        };
    }

    public async findByRecent({ cityId }: IFindLocationDTO): Promise<Pet[]>{
        const pets = await getRepository(Pet).createQueryBuilder("pets")
            .leftJoin("pets.user", "user", "user.id = pets.tutor_id")
            .leftJoin('pets.breed', 'breed')
            .leftJoin("user.city", "city")
            .where("user.city_id = :cityId", { cityId: cityId })
            .orderBy('pets.created_at', 'DESC')
            .take(10)
            .select([
                'pets.id as id', 
                'pets.name as name',
                'pets.age as age',
                'pets.gender as gender',
                'pets.color as color',
                'breed.name as breed',
                // 'pets.breed as breed',
                'pets.user',
                'city.name AS location',
                'pets.created_at as created_at'
            ])
            .addSelect(subQuery => {
                return subQuery.select('pet_images.path', 'image').from(PetImage, 'pet_images').where('pet_images.pet_id = pets.id').limit(1);
            })
            .getRawMany();

        return pets.map((pet) => {
            return pet.image ? {...pet, image: `${process.env.APP_IMAGE_URL}/files/${pet.image}`} : null;
        });
    }

    public async findByLocation(cityId: string): Promise<Pet[]>{
        return await getRepository(Pet).createQueryBuilder("pets")
            .leftJoinAndSelect("users", "user", "user.id = pets.tutor_id")
            .where("user.city_id = :cityId", { cityId: cityId })
            .getMany();
    }

    public async findById(id: string): Promise<Pet | undefined>{
        const pet = await this.petsRepository.findOne({
            where: {id}, 
            relations: ['breed', 'user', 'images','user.city']
        });
        return pet;
    }

    public async create({ name, gender, age, color, breedId, tutorId }: ICreatePetDTO): Promise<Pet>{
        const pet = this.petsRepository.create({
            name, 
            gender: Gender[gender], 
            age, 
            color, 
            breed_id: breedId, 
            tutor_id: tutorId
        });

        return await this.petsRepository.save(pet);
    }

}

export default PetsRepository;