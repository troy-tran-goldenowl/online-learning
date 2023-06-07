import { DatabaseTable } from '../../constants/table.enum';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCourseRating1686026567255 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DatabaseTable.CourseRating,
        columns: [
          { name: 'id', type: 'integer', isPrimary: true, isGenerated: true },
          { name: 'rating', type: 'integer', isNullable: false },
          { name: 'comment', type: 'varchar', isNullable: true },
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
          { name: 'courseId', type: 'integer' },
          { name: 'userId', type: 'integer' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      DatabaseTable.CourseRating,
      new TableForeignKey({
        columnNames: ['courseId'],
        referencedColumnNames: ['id'],
        referencedTableName: DatabaseTable.Course,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      DatabaseTable.CourseRating,
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: DatabaseTable.User,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(DatabaseTable.CourseRating);

    const foreignKeyCourse = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('courseId') !== -1,
    );
    await queryRunner.dropForeignKey(
      DatabaseTable.CourseRating,
      foreignKeyCourse,
    );

    const foreignKeyUser = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );
    await queryRunner.dropForeignKey(
      DatabaseTable.CourseRating,
      foreignKeyUser,
    );

    await queryRunner.dropTable(DatabaseTable.CourseRating);
  }
}
