import { Test, TestingModule } from '@nestjs/testing';

import { RegistrationService } from './registration.service';
import { HttpStatus } from '@nestjs/common';

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
      ],
    }).compile();

    regService = app.get<RegistrationService>(RegistrationService);
  });

  describe('root', () => {
    it('should send a message', async () => {
      try {
        const result = await regService.sendMessage({
          studentId: '0953294',
          name: 'Alven',
          courseCode: 'BCS',
        });

        expect(result).toBe('ok');
      } catch (error) {
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });
});
