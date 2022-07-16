import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext)=>{
        // data is the argument prvided to the Decorator;
        const request = context.switchToHttp().getRequest();
        return request.currentUser;
    }
)