import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude, Expose } from "class-transformer";

import Pet from "./Pet";

@Entity('pet_images')
class PetImage{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Pet)
    @JoinColumn({ name: "pet_id" })
    pet: Pet;

    @Column()
    @Exclude()
    pet_id: string;

    @Column()
    path: string;

    @Expose({ name: 'path' })
    getImageUrl(): string | null {
        return this.path
        ? `${process.env.APP_IMAGE_URL}/files/${this.path}`
        : null;
    }

}

export default PetImage;