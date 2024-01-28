import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Message } from '../../message/entities/message.entity';

@Entity()
export class UserFriends {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column()
  // user1Id: string;

  // @Column()
  // user2Id: string;

  @OneToMany(() => Message, (message) => message.userFriends)
  messages: Message[];

  @ManyToOne(() => User, (user) => user.userToUser1)
  user1: User;

  @ManyToOne(() => User, (user) => user.userToUser2)
  user2: User;
}
