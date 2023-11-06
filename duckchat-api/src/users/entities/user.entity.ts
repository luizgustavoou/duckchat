import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    avatarURL: string;
}
