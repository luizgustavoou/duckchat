import { UserFriends } from 'src/friendship/entities/user_friends.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  content: string;

  @ManyToOne(() => UserFriends, (userFriends) => userFriends.messages, {
    onDelete: 'CASCADE',
  })
  userFriends: UserFriends;

  @ManyToOne(() => User, (user) => user.messages, {
    onDelete: 'CASCADE',
  })
  user: User;
}
