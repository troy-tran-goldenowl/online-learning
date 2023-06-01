import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { DatabaseTable } from '../../constants/table.enum';

export class CreateCourse1685605204176 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DatabaseTable.Course,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'instructorId',
            type: 'integer',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      DatabaseTable.Course,
      new TableForeignKey({
        columnNames: ['instructorId'],
        referencedTableName: DatabaseTable.Instructor,
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(DatabaseTable.Course);
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('instructorId') !== -1,
    );
    await queryRunner.dropForeignKey(DatabaseTable.Course, foreignKey);
    await queryRunner.dropTable(DatabaseTable.Course);
  }
}
