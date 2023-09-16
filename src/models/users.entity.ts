import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false, name: 'user_name' })
  userName: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  firstName: string;

  @Column({nullable: true})
  lastName: string;

  @Column()
  @Exclude()
  password: string;
}
