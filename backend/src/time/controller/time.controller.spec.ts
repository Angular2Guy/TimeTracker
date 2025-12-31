import { Test, TestingModule } from '@nestjs/testing';
import { TimeController } from './time.controller';
import { TimeService } from '../service/time.service';

describe('TimeController', () => {
  let appController: TimeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TimeController],
      providers: [TimeService],
    }).compile();

    appController = app.get<TimeController>(TimeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
