import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(
        private userService: UsersService
    ){}
    @Post("/signup")
    createUser(@Body() user: createUserDto){
        // console.log(user);
        return this.userService.create(user.email, user.password)
    }
    @Get("/findById/:id")
    findOne(@Param("id") id:number){
        return this.userService.findOne(id)
    }
    @Get("/findByEmail/:email")
    find(@Param("email") email:string){
        return this.userService.find(email)
    }
    @Patch("/:id")
    update(@Body() body: updateUserDto, @Param("id") id:number){
        return this.userService.update(id, body)
    }
    @Delete("/deleteById/:id")
    remove(@Param("id") id:number){
        return this.userService.remove(id)
    }
}
