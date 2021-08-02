import City from "@modules/cities/infra/typeorm/entities/City";
import User from "@modules/users/infra/typeorm/entities/User";
import { Exclude, Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Breed from "./Breed";
import PetImage from "./PetImage";

export enum Gender {
    Male = 'male',
    Female = 'female'
}

@Entity('pets')
class Pet{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        type: "enum",
        enum: Gender,
    })
    gender: Gender;

    //in months
    @Column()
    age: number;

    @Column()
    color: string;

    @ManyToOne(() => User, user => user.pets)
    @JoinColumn({ name: "tutor_id" })
    user: User;

    @Column()
    tutor_id: string;

    @ManyToOne(() => Breed)
    @JoinColumn({ name: "breed_id" })
    breed: Breed;

    @Column()
    breed_id: string;

    // @Column({ nullable: true, insert: false, update: false, select: false })
    // location: string;

    @OneToMany(() => PetImage, petImage => petImage.pet)
    @JoinColumn({ name: "pet_id" })
    images: PetImage[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    @Exclude()
    updated_at: Date;
}

export default Pet;