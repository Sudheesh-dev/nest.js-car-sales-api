import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(
        private userService: UsersService
    ){}
    @Post("/signup")
    createUser(@Body() user: createUserDto){
        console.log(user);
        this.userService.create(user.email, user.password)
    }
}
