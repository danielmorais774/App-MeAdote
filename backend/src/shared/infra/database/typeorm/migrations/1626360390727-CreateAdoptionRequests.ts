import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateAdoptionRequests1626360390727 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'adoption_requests',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'pet_id',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: ['requested', 'refused', 'accepted', 'adopted', 'canceled']
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

        await queryRunner.createForeignKeys('adoption_requests',
            [
                new TableForeignKey({
                    name: 'userIdToAdoptionRequestsForeign',
                    columnNames: ['user_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'users',
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                }),
                new TableForeignKey({
                    name: 'petIdToAdoptionRequestsForeign',
                    columnNames: ['pet_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'pets',
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                }),
            ] 
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('adoption_requests');
    }

}
