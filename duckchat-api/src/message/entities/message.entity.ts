import { UserFriends } from 'src/friendship/entities/user_friends.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => UserFriends, (userFriends) => userFriends.messages)
  userFriends: UserFriends;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;
}
