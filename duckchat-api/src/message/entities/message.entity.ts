import { UserFriends } from 'src/friends/entities/user_friends.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => UserFriends, (userFriends) => userFriends.messages)
  userFriends: UserFriends;
}
