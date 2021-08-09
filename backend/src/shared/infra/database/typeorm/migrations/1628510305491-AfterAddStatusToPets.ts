import {MigrationInterface, QueryRunner, Raw, TableColumn} from "typeorm";

export class AfterAddStatusToPets1628510305491 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('pets', new TableColumn({
            name: 'status',
            type: 'enum',
            enum: ['enable', 'disable'],
            default: `'enable'`
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('pets', 'status');
    }

}
