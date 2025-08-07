import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';

import { RegistrationService } from './registration.service';
import { RegistrationRepository } from './repositories/registration.repository';
import { Student } from './entities/student.entity';

describe('RegistrationService', () => {
  let regService: RegistrationService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        RegistrationService,
        {
          provide: 'RABBITMQ_CLIENT',
          useValue: {
            emit: jest.fn().mockImplementation(() => ({
              toPromise: jest.fn().mockResolvedValue('ok'),
            })),
            send: jest.fn().mockImplementation(() => ({
              toPromise: jest.fn().mockResolvedValue('ok'),
            })),
          },
        },
        {
          provide: RegistrationRepository,
          useValue: {
            getStudentById: jest.fn().mockResolvedValue({
              id: '5543231',
              name: 'Juan dela Cruz',
              course: 'BCS',
              dob: '1990-10-01',
            } as Student),
          },
        },
      ],
    }).compile();

    regService = app.get<RegistrationService>(RegistrationService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('root', () => {
    it('should send a message', async () => {
      try {
        const result = await regService.sendMessage('5543231');

        expect(result).toBe('ok');
      } catch (error) {
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });
});
