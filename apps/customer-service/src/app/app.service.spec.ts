import { Test } from '@nestjs/testing';

import { AppService } from './app.service';
import { PrismaService } from '@puppilots/shared-services';
import { Role } from '@prisma/client';
import { UserExistException } from '@puppilots/shared-exceptions';

describe('AppService', () => {
  let service: AppService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService, PrismaService],
    }).compile();

    service = app.get<AppService>(AppService);
    prisma = app.get<PrismaService>(PrismaService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });

  describe("createUser", () => {

    it("should create a new user when valid email and password are provided", async () => {
      const response = {
        id: "ff0b8e81-6378-4fc1-adfe-29baa666a062",
        email: "marcos@mgial.com",
        role: Role.CUSTOMER ,
        tokenResetPassword: "",
        emailConfirmed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        password: "$2b$10$wV7xWTeueliwosC9S/pqJO1W8Q1zIEPa.6gbYY/nJQVpzEgLBnD9u"
      };

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
      jest.spyOn(prisma.user, 'create').mockResolvedValue(response);

      const user = await service.createUser({email: "marcos@mgial.com", password: "marcos123.,"});

      expect(user.email).toBe(response.email);
      expect(user.role).toBe(response.role);
      expect("ff0b8e81-6378-4fc1-adfe-29baa666a062").toBe(response.id);
    });

    it("should throw UserExistException when user with same email already exist", async () => {
      const response = {
        id: "ff0b8e81-6378-4fc1-adfe-29baa666a062",
        email: "marcos@mgial.com",
        role: Role.CUSTOMER ,
        tokenResetPassword: "", emailConfirmed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        password: "$2b$10$wV7xWTeueliwosC9S/pqJO1W8Q1zIEPa.6gbYY/nJQVpzEgLBnD9u"
      };

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(response);

      await expect( async () => {
        await service.createUser({email: "marcos@mgial.com", password: "marcos123.,"})
      }).rejects.toThrow(UserExistException);
    });
  });
});
