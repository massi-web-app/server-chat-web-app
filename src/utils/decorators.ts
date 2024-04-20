import {createParamDecorator,ExecutionContext} from '@nestjs/common';
import { AuthenticateGuard } from "../auth/utils/Guards";
import { AuthticatedRequest } from "./types";


export const AuthUser=createParamDecorator((data:unknown,ctx:ExecutionContext) =>{
  const request=<AuthticatedRequest>ctx.switchToHttp().getRequest();
  return request.user;
})