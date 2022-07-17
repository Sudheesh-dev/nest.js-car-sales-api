import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response, Request, NextFunction } from "express";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";

declare global{
    namespace Express{
        interface Request{
            currentUser?: User
        }
    }
}//fix type issue

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware{
    constructor(private userService: UsersService){}
    async use(req: Request, res: Response, next: NextFunction) {

        const session = req.session;
        console.log("session", session);
        

        if(!session?.userId) next();

        const user = await this.userService.findOne(session.userId);
        req.currentUser = user;
        next();
    }
}