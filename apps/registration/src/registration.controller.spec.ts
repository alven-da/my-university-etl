import { Test, TestingModule } from '@nestjs/testing';

import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { RegistrationRepository } from './repositories/registration.repository';

describe('RegistrationController', () => {
  let controller: RegistrationController;
  let service: RegistrationService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RegistrationController],
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
          useValue: {},
        },
      ],
    }).compile();

    controller = app.get<RegistrationController>(RegistrationController);
    service = app.get<RegistrationService>(RegistrationService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('root', () => {
    it('should return "This is the Registration Service"', () => {
      expect(controller.healthCheck()).toBe('This is the Registration Service');
    });

    it('should send a message to a message queue', async () => {
      jest.spyOn(service, 'sendMessage').mockResolvedValue('ok');

      const result = await controller.sendMessage('093453239');

      expect(result).toBe('ok');
    });
  });
});
