import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AfterAddCityIdToUsers1625928515195 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'city_id',
            type: 'uuid',
            isNullable: false
        }));

        await queryRunner.createForeignKey(
            'users',
            new TableForeignKey({
              name: 'cityIdToUsersForeign',
              columnNames: ['city_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'cities',
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users', 'cityIdToUsersForeign');
        await queryRunner.dropColumn('users', 'city_id');
    }

}
