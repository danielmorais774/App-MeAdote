import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Type {
    Dog = 'dog',
    Cat = 'cat'
}

@Entity('breeds')
class Breed{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        type: "enum",
        enum: Type,
    })
    type: Type;

}

export default Breed;