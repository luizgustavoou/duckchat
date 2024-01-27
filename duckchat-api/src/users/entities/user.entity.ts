import { Session } from 'src/sessions/entities/session.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  avatarURL: string;

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];

  @ManyToMany(() => User, (user) => user.friends)
  @JoinTable()
  friends: User[];
}
