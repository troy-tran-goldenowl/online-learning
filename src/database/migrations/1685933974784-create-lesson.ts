import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { DatabaseTable } from '../../constants/table.enum';

export class CreateLesson1685933974784 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DatabaseTable.Lesson,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'content',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'duration_in_minutes',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'order',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'image_url',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'video_url',
            type: 'varchar',
            isNullable: true,
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
            name: 'courseId',
            type: 'integer',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      DatabaseTable.Lesson,
      new TableForeignKey({
        columnNames: ['courseId'],
        referencedTableName: DatabaseTable.Course,
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(DatabaseTable.Lesson);
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('courseId') !== -1,
    );
    await queryRunner.dropForeignKey(DatabaseTable.Lesson, foreignKey);
    await queryRunner.dropTable(DatabaseTable.Lesson);
  }
}
