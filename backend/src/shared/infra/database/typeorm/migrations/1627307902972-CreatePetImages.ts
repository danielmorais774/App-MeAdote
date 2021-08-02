import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreatePetImages1627307902972 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'pet_images',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'pet_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'path',
                        type: 'varchar',
                        isNullable: false
                    }
                ]
            })
        );

        await queryRunner.createForeignKeys('pet_images',
            [
                new TableForeignKey({
                    name: 'petdToPetImagesForeign',
                    columnNames: ['pet_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'pets',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }),
            ] 
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pet_images');
    }

}
