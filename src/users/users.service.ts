import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>
    ){}
    create(email: string, password:string){
        const user = this.repo.create({
            email,
            password
        });
        return this.repo.save(user);
    }
    findOne(id:number){
        if(!id) throw new NotFoundException("not found")
        return this.repo.findOne({
            where: {
                id: id,
            },
        })
    }
    find(email: string){
        return this.repo.find({
            where: {
                email,
            },
        })
    }
    async update(id:number, data:Partial<User> ){
        const user = await this.repo.findOne({
            where: {
                id,
            },
        })
        if(!user){
            throw new Error("User not found")
        }
        Object.assign(user, data)
        return await this.repo.save(user)
    }
    async remove(id:number){
        // const user = await this.repo.findOne({
        //     where: {
        //         id,
        //     },
        // })
        // if(!user){
        //     throw new Error("User not found")
        // }
        // return this.repo.remove(user)
        return this.repo.delete({
            id
        })
    }
}
