import Pet from "@modules/pets/infra/typeorm/entities/Pet";
import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "./User";

export enum Status {
    REQUESTED = 'requested',
    REFUSED = 'refused',
    ACCEPTED = 'accepted',
    ADOPTED = 'adopted',
    CANCELED = 'canceled'
}

@Entity('adoption_requests')
class AdoptionRequest{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    user_id: string;

    @ManyToOne(() => Pet)
    @JoinColumn({ name: "pet_id" })
    pet: Pet;

    @Column()
    pet_id: string;

    @Column({
        type: "enum",
        enum: Status,
    })
    status: Status;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    @Exclude()
    updated_at: Date;
}

export default AdoptionRequest;