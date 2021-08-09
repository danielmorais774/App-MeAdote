import { Equal, getConnection, getRepository, Not, Repository } from "typeorm";

import IAdoptionRequestsRepository from "@modules/users/repositories/IAdoptionRequestsRepository";
import AdoptionRequest, { Status } from "../entities/AdoptionRequest";
import ICreateAdoptionRequestDTO from "@modules/users/dtos/ICreateAdoptionRequestDTO";
import Pet from "@modules/pets/infra/typeorm/entities/Pet";
import IEditAdoptionRequestDTO from "@modules/users/dtos/IEditAdoptionRequestDTO";

class AdoptionRequestsRepository implements IAdoptionRequestsRepository{

    private adoptionRequestsRepository: Repository<AdoptionRequest>;

    constructor(){
        this.adoptionRequestsRepository = getRepository(AdoptionRequest);
    }

    public async findAllByUser(userId: string) : Promise<AdoptionRequest[]>{
        return await this.adoptionRequestsRepository.find({
            where: {
                user_id: userId
            },
            order:{
                created_at: 'DESC'
            },
            relations: ['pet', 'pet.user', 'pet.user.city', 'pet.images', 'pet.breed']
        });
    }

    public async findById(id: string): Promise<AdoptionRequest | undefined >{
        return await this.adoptionRequestsRepository.findOne(id);
    }

    public async findByPetIdAndUserId(petId: string, userId: string): Promise<AdoptionRequest | undefined>{
        return await this.adoptionRequestsRepository.findOne({where: {pet_id: petId, user_id: userId, status: Not('canceled')}});
    }

    public async findReceiverByUserPet(userId: string): Promise<AdoptionRequest[]>{

        let adoptionRequests = await getRepository(AdoptionRequest)
            .createQueryBuilder('adoption_requests')
            .leftJoinAndSelect('adoption_requests.pet', 'pet', 'pet_id = pet.id')
            .leftJoinAndSelect('pet.images', 'images')
            .leftJoinAndSelect('pet.breed', 'breed')
            .leftJoinAndSelect('adoption_requests.user', 'user', 'user.id = adoption_requests.user_id')
            .leftJoinAndSelect('user.city', 'city')
            .where('pet.user.id = :userId', { userId })
            .andWhere('adoption_requests.status != :status', {status: 'canceled'})
            .orderBy('adoption_requests.created_at', 'DESC')
            .getMany();

        return adoptionRequests;
    }

    public async create({ userId, petId, status }: ICreateAdoptionRequestDTO) : Promise<AdoptionRequest>{
        const adoptionRequest = this.adoptionRequestsRepository.create({
            user_id: userId,
            pet_id: petId,
            status
        });

        return await this.adoptionRequestsRepository.save(adoptionRequest);
    }

    public async editStatusById(data: IEditAdoptionRequestDTO): Promise<AdoptionRequest>{
        return await this.adoptionRequestsRepository.save({
            id: data.id,
            status: data.status
        });
    }

    public async deleteRequestsByPetId(petId: string): Promise<void>{
        await this.adoptionRequestsRepository.delete({pet_id: petId});
    }

}

export default AdoptionRequestsRepository;