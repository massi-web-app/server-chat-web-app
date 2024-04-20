import { Test, TestingModule } from '@nestjs/testing';
import { ParticipantsService } from '../participants.service';

describe('ParticipantService', () => {
  let service: ParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParticipantsService],
    }).compile();

    service = module.get<ParticipantsService>(ParticipantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
