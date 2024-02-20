import { AuthGuard } from "@nestjs/passport";
//TODO: REMOVE 
export class jwtGuard extends AuthGuard('jwt') {
    constructor(){
        super();
    }
}

export * from './jwt.guard';