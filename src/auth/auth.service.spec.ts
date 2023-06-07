import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dtos/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from 'src/utils/test.util';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('should return the user if email and password match', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const user = {
        id: 1,
        email,
        password: await bcrypt.hash(password, 10),
      } as User;
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await service.validateUser(email, password);

      expect(userService.findByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
      expect(result).toBe(user);
    });

    it('should return null if email does not exist', async () => {
      const email = 'nonexistent@example.com';
      const password = 'password123';
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);

      const result = await service.validateUser(email, password);

      expect(userService.findByEmail).toHaveBeenCalledWith(email);
      expect(result).toBeNull();
    });

    it('should return null if password does not match', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'wrongpassword';
      const user = {
        id: 1,
        email,
        password: await bcrypt.hash('password123', 10),
      } as User;
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      // Act
      const result = await service.validateUser(email, password);

      // Assert
      expect(userService.findByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
      expect(result).toBeNull();
    });
  });

  describe('signIn', () => {
    it('should return the user with access token', () => {
      // Arrange
      const user = {
        id: 1,
        email: 'test@example.com',
        password: 'password123',
      } as User;
      const expectedToken = 'jwt-token';
      jest.spyOn(jwtService, 'sign').mockReturnValue(expectedToken);

      // Act
      const result = service.signIn(user);

      // Assert
      expect(result.user).toBe(user);
      expect(result.access_token).toBe(expectedToken);
      expect(jwtService.sign).toHaveBeenCalledWith(user);
    });
  });

  describe('signUp', () => {
    it('should call userService.create with signUpDto', async () => {
      // Arrange
      const signUpDto: SignUpDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const createdUser = {
        id: 1,
        email: signUpDto.email,
        password: signUpDto.password,
      } as User;
      jest.spyOn(userService, 'create').mockResolvedValue(createdUser);

      // Act
      const result = await service.signUp(signUpDto);

      // Assert
      expect(userService.create).toHaveBeenCalledWith(signUpDto);
      expect(result).toBe(createdUser);
    });
  });
});
