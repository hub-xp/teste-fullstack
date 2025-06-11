import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeedModule } from './Config/Seeds/seed.module';
import { SeedCommand } from './Config/Seeds/seed.command';
import { DatabaseConfigService } from './Config/database.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbConfig = new DatabaseConfigService(configService);
        return dbConfig.createMongooseOptions();
      },
      inject: [ConfigService],
    }),
    CommandModule,
    SeedModule
  ],
  providers: [SeedCommand],
})
export class CliModule {} 