import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Session {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    accessToken: string;

    @Column()
    refreshToken: string;
}
