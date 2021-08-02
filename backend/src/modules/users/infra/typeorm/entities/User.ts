import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude, Expose } from 'class-transformer';
 
import City from "@modules/cities/infra/typeorm/entities/City";
import Pet from "@modules/pets/infra/typeorm/entities/Pet";


@Entity('users')
class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @ManyToOne(() => City)
    @JoinColumn({ name: "city_id" })
    city: City;

    @Column()
    @Exclude()
    city_id: string;

    @Column()
    phone: string;

    @Column()
    @Exclude()
    avatar: string;

    @OneToMany(() => Pet, pet => pet.user)
    pets: Pet[];

    @CreateDateColumn()
    @Exclude()
    created_at: Date;

    @UpdateDateColumn()
    @Exclude()
    updated_at: Date;
    
    @Expose({ name: 'avatarUrl' })
    getImageUrl(): string | null {
        return this.avatar
        ? `${process.env.APP_IMAGE_URL}/files/${this.avatar}`
        : null;
    }
}

export default User;