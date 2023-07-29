import { Injectable, Logger } from '@nestjs/common';
import { UserLoginDto } from '@puppilots/shared-dtos';
import { PrismaService } from '@puppilots/shared-services';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService) {}
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async validateUser(userlogin: UserLoginDto): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email: userlogin.email }
    });
    if(user && (await bcrypt.compare(userlogin.password, user.password))) {
      return user;
    }
    return null;
  }
  
  async login(user: User) {
    const payload = { username: user.email, sub: user.id, role: user.role };
    Logger.log("LLegue", user.email);
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
