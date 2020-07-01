import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
const TABLE_NAME = 'transactions';
export class Transactions1593378092497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: TABLE_NAME,
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'value',
                    type: 'numeric',
                    precision: 10,
                    scale: 2

                },
                {
                    name: 'type',
                    type: 'varchar'
                },
                {
                    name: 'category_id',
                    type: 'uuid',
                    isNullable: true

                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TABLE_NAME);
    }

}
