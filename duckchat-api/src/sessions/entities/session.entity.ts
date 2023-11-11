import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Session {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    accessToken: string;

    @Column()
    refreshToken: string;

    @OneToOne(() => User, { eager: true })
    @JoinColumn()
    user: User;
}
