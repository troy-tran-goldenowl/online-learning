import { DatabaseTable } from '../../constants/table.enum';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class CreateEnrollment1686020642735 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DatabaseTable.Enrollment,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
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
            name: 'userId',
            type: 'integer',
          },
          {
            name: 'courseId',
            type: 'integer',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      DatabaseTable.Enrollment,
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: DatabaseTable.User,
        referencedColumnNames: ['id'],
      }),
    );

    await queryRunner.createForeignKey(
      DatabaseTable.Enrollment,
      new TableForeignKey({
        columnNames: ['courseId'],
        referencedTableName: DatabaseTable.Course,
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createUniqueConstraint(
      DatabaseTable.Enrollment,
      new TableUnique({ columnNames: ['userId', 'courseId'] }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(DatabaseTable.Enrollment);
    const userForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );
    const courseForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('courseId') !== -1,
    );
    await queryRunner.dropForeignKey(DatabaseTable.Enrollment, userForeignKey);
    await queryRunner.dropForeignKey(
      DatabaseTable.Enrollment,
      courseForeignKey,
    );
    await queryRunner.dropTable(DatabaseTable.Enrollment);
  }
}
