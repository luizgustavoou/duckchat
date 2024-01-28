import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users/entities/user.entity';

@Entity()
export class UserFriends {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user1Id: string;

  @Column()
  user2Id: string;

  @Column()
  nivelDeAmizade: number;

  @ManyToOne(() => User, (user) => user.userToUser1)
  user1: User;

  @ManyToOne(() => User, (user) => user.userToUser2)
  user2: User;
}
