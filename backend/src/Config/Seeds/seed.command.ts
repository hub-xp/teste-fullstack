import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { SeedService } from './seed';

@Injectable()
export class SeedCommand {
  constructor(private readonly seedService: SeedService) {}

  @Command({
    command: 'seed:run',
    describe: 'Run the seed',
  })
  async run() {
    await this.seedService.seed();
  }
} 