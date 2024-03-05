import {
    createParamDecorator,
    ExecutionContext,
  } from '@nestjs/common';

  import { Request } from 'express';

interface CustomRequest extends Request {
  user?: any; // Use `any` or a more specific type if you know the shape of `user`
}
  
  export const GetUser = createParamDecorator(
    (
      data: string | undefined,
      ctx: ExecutionContext,
    ) => {
      const request: CustomRequest = ctx
        .switchToHttp()
        .getRequest();
      if (data) {
        return request.user[data];
      }
      return request.user;
    },
  );

export * from './get-user-decorator'