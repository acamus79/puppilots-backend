import { Injectable } from '@nestjs/common';
import { UserLoginDto, VerifyTokenDto } from '@puppilots/shared-dtos';
import { PrismaService } from '@puppilots/shared-services';
import * as bcrypt from 'bcrypt';
import { Role, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedTokenException } from '@puppilots/shared-exceptions';

@Injectable()
export class AppService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService) {}
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  /**
   * Validates a user's login credentials.
   *
   * @param userlogin - An object containing the user's email and password input.
   * @returns The user object if the login credentials are valid, otherwise null.
   */
  async validateUser(userlogin: UserLoginDto): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email: userlogin.email }
    });
    if(user && (await bcrypt.compare(userlogin.password, user.password))) {
      return user;
    }
    return null;
  }

  /**
   * Generates a JWT access token for a user upon successful login.
   *
   * @param user - A User object containing the user's email, id, and role.
   * @returns An object containing the access token.
   */
  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };
   // Logger.log("LLegue", user.email);
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
  /**
   * Verifies the authenticity of a JWT access token by decoding it using the JwtService.
   * If the token is valid, the decoded payload is returned. Otherwise, an UnauthorizedTokenException is thrown.
   *
   * @param token - The JWT access token to be verified.
   * @returns The decoded payload if the token is valid.
   * @throws UnauthorizedTokenException if the token is invalid.
  */
  async verifyToken(token: VerifyTokenDto): Promise<DecodedData> {
    try{
      const decoded = this.jwtService.verify(token.token);
      return decoded;
    } catch(error) {
      throw new UnauthorizedTokenException();
    }
  }
}

interface DecodedData {
  email: string;
  sub: string;
  role: Role;
}