import paginate from "@config/paginate";
import City from "@modules/cities/infra/typeorm/entities/City";
import ICreatePetDTO from "@modules/pets/dtos/ICreatePetDTO";
import IFindAllPetDTO from "@modules/pets/dtos/IFindAllPetDTO";
import IFindLocationDTO from "@modules/pets/dtos/IFindLocationDTO";
import IPetsRepository from "@modules/pets/repositories/IPetsRepository";
import AdoptionRequest from "@modules/users/infra/typeorm/entities/AdoptionRequest";
import { createQueryBuilder, getRepository, Not, Repository } from "typeorm";

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
            .where('pets.status = :status', {status: 'enable'})
            .take(limit);
            
        if(cityId){
            pets = pets.where("user.city_id = :cityId", { cityId: cityId });
        }

        let data = await pets.getRawMany();
        
        const total = await pets.getCount();

        // verifica se há algum pet se imagem
        data = data.filter((pet) => pet.image !== null);

        data = data.map((pet) => {
            return pet.image ? {...pet, image: `${process.env.APP_IMAGE_URL}/files/${pet.image}`} : null;
        });

        return {
            data,
            total
        };
    }

    public async findByRecent({ cityId }: IFindLocationDTO): Promise<Pet[]>{
        let pets = await getRepository(Pet).createQueryBuilder("pets")
            .leftJoin("pets.user", "user", "user.id = pets.tutor_id")
            .leftJoin('pets.breed', 'breed')
            .leftJoin("user.city", "city")
            .where("user.city_id = :cityId", { cityId: cityId })
            .andWhere('pets.status = :status', {status: 'enable'})
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


        // verifica se há algum pet se imagem
        pets = pets.filter((pet) => pet.image !== null);

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

    public async findById(id: string, userId?: string): Promise<Pet | undefined>{
        let pet = await getRepository(Pet)
            .createQueryBuilder("pets")
            .leftJoinAndSelect('pets.breed', 'breed')
            .leftJoinAndSelect('pets.user', 'user')
            .leftJoinAndSelect('pets.images', 'images')
            .leftJoinAndSelect('user.city', 'city')
            .where('pets.id = :petId', {petId: id})
            .getOne();

        if(userId && pet){
            const adoptionRequest = await getRepository(AdoptionRequest).findOne({where: {user_id: userId, pet_id: id, status: Not('canceled')}});
            pet.isAdoptionRequested = !!adoptionRequest;
        }

        return pet;
    }

    public async findByTutorId(tutorId: string): Promise<Pet[]>{

        const pets = await getRepository(Pet).createQueryBuilder("pets")
        .leftJoin("pets.user", "user", "user.id = pets.tutor_id")
        .leftJoin('pets.breed', 'breed')
        .leftJoin("user.city", "city")
        .where("pets.tutor_id = :tutorId", { tutorId: tutorId })
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

    public async save(pet: Pet): Promise<Pet>{
        return await this.petsRepository.save(pet);
    }

    public async delete(pet: Pet): Promise<void>{
        await this.petsRepository.delete(pet.id);
    }

}

export default PetsRepository;