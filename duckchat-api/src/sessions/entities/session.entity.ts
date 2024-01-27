import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Session {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("longtext")
    accessToken: string;

    @Column("longtext")
    refreshToken: string;

    @ManyToOne(() => User, (user) => user.sessions, { eager: true, onDelete: "CASCADE" })
    user: User;
}
