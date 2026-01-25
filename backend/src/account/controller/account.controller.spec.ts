import { Test, TestingModule } from '@nestjs/testing';
import { AccountControllerController } from './account.controller';

describe('AccountControllerController', () => {
  let controller: AccountControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountControllerController],
    }).compile();

    controller = module.get<AccountControllerController>(AccountControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
