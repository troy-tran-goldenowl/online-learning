import { DatabaseTable } from '../../constants/table.enum';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateInstructorRating1686028480385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DatabaseTable.InstructorRating,
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
          { name: 'instructorId', type: 'integer', isNullable: true },
          { name: 'userId', type: 'integer', isNullable: true },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      DatabaseTable.InstructorRating,
      new TableForeignKey({
        columnNames: ['instructorId'],
        referencedTableName: DatabaseTable.Instructor,
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      DatabaseTable.InstructorRating,
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: DatabaseTable.User,
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(DatabaseTable.InstructorRating);

    const foreignKeyCourse = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('instructorId') !== -1,
    );
    await queryRunner.dropForeignKey(
      DatabaseTable.InstructorRating,
      foreignKeyCourse,
    );

    const foreignKeyUser = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );
    await queryRunner.dropForeignKey(
      DatabaseTable.InstructorRating,
      foreignKeyUser,
    );

    await queryRunner.dropTable(DatabaseTable.InstructorRating);
  }
}
