import { Headers, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { UserLoginDto, VerifyTokenDto } from '@puppilots/shared-dtos';
import { ApiExtraModels, ApiOperation } from '@nestjs/swagger';
import { Role, UserPayload } from '@prisma/client';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';


@Controller("auth")
@ApiExtraModels(UserLoginDto, VerifyTokenDto)
@UseGuards(RolesGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("login")
  @ApiOperation({ summary: 'Authenticate by email and password',
                  description: 'Returns a token of type JWT, to authenticate in the application.'})
  async login(@Body() userLogin: UserLoginDto): Promise<unknown> {
    return await this.appService.login(userLogin);
  }

  @Post("verify-token")
  @ApiOperation({ summary: 'Validate token per body',
                  description: 'Returns a data transfer object with the record'})
  async verifyToken(@Body() token: VerifyTokenDto): Promise<UserPayload> {
    return await this.appService.verifyToken(token);
  }

  @Post("verify")
  @ApiOperation({ summary: 'Validate token by header',
                  description: 'Returns a data transfer object with the record'})
  @Roles(Role.CUSTOMER, Role.PILOT)
  async verify(@Headers('authorization') authHeader: string): Promise<UserPayload> {
    const verifyTokenDto = new VerifyTokenDto();
    verifyTokenDto.token = authHeader.replace('Bearer ', '' );;
    return await this.appService.verifyToken(verifyTokenDto);
  }

}
