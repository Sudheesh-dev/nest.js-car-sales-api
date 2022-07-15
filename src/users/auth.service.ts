import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService{
    constructor(private readonly userServive: UsersService){}
    async signup(email: string, password:string){
        const user = await this.userServive.find(email);
        if(user?.length){
            throw new BadRequestException("User already exist")
        }
        const salt = randomBytes(8).toString("hex");
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const result = salt + "." + hash.toString("hex");
        return await this.userServive.create(email, result)
    }
    async signin(email: string, password:string){
        const [user] = await this.userServive.find(email);
        if(!user){
            throw new NotFoundException("User not found")
        }
        const [salt , hashOriginal] = user.password.split(".")
        const hashBuffer = (await scrypt(password, salt, 32)) as Buffer;
        const hash = hashBuffer.toString("hex")
        if(hash === hashOriginal){
            return user;
        }else{
            throw new NotFoundException("Wrong psd or email")
        }

    }
}