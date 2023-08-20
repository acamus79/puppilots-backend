import { ExecutionContext, createParamDecorator } from "@nestjs/common";

/**
 * ParamDecorator` function from the `@nestjs/common` module. 
 * This decorator is used to extract the user ID from the request object
 */
export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.sub
  }
);