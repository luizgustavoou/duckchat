import { UserFriends } from 'src/friends/entities/user_friends.entity';
import { Session } from 'src/sessions/entities/session.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];

  @OneToMany(() => UserFriends, (userFriends) => userFriends.user1)
  userToUser1: UserFriends[];

  @OneToMany(() => UserFriends, (userFriends) => userFriends.user2)
  userToUser2: UserFriends[];
}
