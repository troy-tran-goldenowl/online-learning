import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from 'src/utils/test.util';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should call signIn method of authService and return its result', async () => {
      const user = {};
      const signInResult = { email: '123' };
      jest
        .spyOn(authService, 'signIn')
        .mockResolvedValue(signInResult as never);

      const result = await controller.login(user);

      expect(authService.signIn).toHaveBeenCalledWith(user);
      expect(result).toBe(signInResult);
    });
  });

  describe('signup', () => {
    it('should call signUp method of authService and return its result', async () => {
      const signUpDto: SignUpDto = { email: 'abc', password: '1234' }; // mock sign-up DTO
      const signUpResult = signUpDto;
      jest.spyOn(authService, 'signUp').mockResolvedValue(signUpResult as User);

      const result = await controller.signup(signUpDto);

      expect(authService.signUp).toHaveBeenCalledWith(signUpDto);
      expect(result).toBe(signUpResult);
    });
  });
});
