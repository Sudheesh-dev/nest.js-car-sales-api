import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
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
    async createUser(@Body() user: createUserDto, @Session() session: any){
        const userData = await this.authService.signup(user.email, user.password)
        session.userId = userData.id;
        return userData;
    }
    @Post("/signin")
    async signIn(@Body() user: createUserDto, @Session() session: any){
        const userData = await this.authService.signin(user.email, user.password)
        session.userId = userData.id;
        return userData
    }
    @Post("/signout")
    async signOut(@Session() session: any){
        session.userId = null;
    }
    @UseGuards(AuthGuard)
    @Serialize(UserDto) // interceptor that modifies outgoing data
    @Get("/findById/:id")
    findOne(@Param("id") id:number, @CurrentUser() user: any){
        console.log(user, id)
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
