import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Session {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    accessToken: string;

    @Column()
    refreshToken: string;

    @ManyToOne(() => User, (user) => user.sessions, { eager: true })
    user: User;
}
