import { Chat } from "src/chat/entities/chat.entity";
import { Message } from "src/message/entities/message.entity";
import { Session } from "src/sessions/entities/session.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
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

    @OneToMany(() => Session, (session) => session.user,)
    sessions: Session[]

    @ManyToMany(() => Chat)
    @JoinTable()
    chats: Chat[]

    @OneToMany(() => Message, (message) => message.user)
    messages: Message[]

}
