import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { createUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService,
    ){}
    @Post("/signup")
    createUser(@Body() user: createUserDto){
        // console.log(user);
        return this.authService.signup(user.email, user.password)
    }
    @Post("/signin")
    signIn(@Body() user: createUserDto){
        // console.log(user);
        return this.authService.signin(user.email, user.password)
    }
    @Serialize(UserDto)
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
