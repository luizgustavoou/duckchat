import { UserFriends } from 'src/friendship/entities/user_friends.entity';
import { Message } from 'src/message/entities/message.entity';
import { Session } from 'src/sessions/entities/session.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => UserFriends, (userFriends) => userFriends.user1)
  userToUser1: UserFriends[];

  @OneToMany(() => UserFriends, (userFriends) => userFriends.user2)
  userToUser2: UserFriends[];
}
