import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass, plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";
import { UserDto } from "src/users/dtos/user.dto";

interface ClassConstructor{
    new (...args:any[]):{}
}

export function Serialize(dto:ClassConstructor){
    return UseInterceptors(new SerializeInterceptor<any>(dto))
}
export class SerializeInterceptor<T> implements NestInterceptor{
    constructor(private dto:T | any){}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // console.log(context);
        // context is the incoming http, ws, grpc request
        return next.handle().pipe(
            map((data:T)=>{
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true // removes all the prop not on dto(@Expose)
                })
            })
        )
    }
}