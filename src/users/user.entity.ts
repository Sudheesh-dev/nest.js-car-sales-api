import { AfterInsert, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email:string;

    @Column()
    password:string;

    @AfterInsert()
    logMessage(){
        console.log(`inserted ${this.email}`);
    }
}