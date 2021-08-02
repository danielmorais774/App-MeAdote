import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreatePets1626124335342 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'pets',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'gender',
                        type: 'enum',
                        enum: ['male', 'female']
                    },
                    {
                        name: 'age',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'color',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'tutor_id',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'breed_id',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ]
            })
        );

        await queryRunner.createForeignKeys('pets',
            [
                new TableForeignKey({
                    name: 'tutorIdToPetsForeign',
                    columnNames: ['tutor_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'users',
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                }),
                new TableForeignKey({
                    name: 'breedIdToPetsForeign',
                    columnNames: ['breed_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'breeds',
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                }),
            ] 
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pets');
    }

}
