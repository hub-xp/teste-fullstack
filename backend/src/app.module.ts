import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { BooksModule } from './Modules/Books/books.module';
import { ReviewsModule } from './Modules/Reviews/reviews.module';
import { SeedModule } from './Config/Seeds/seed.module';
import { SeedCommand } from './Config/Seeds/seed.command';
import { DatabaseConfigService } from './Config/database.config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigService,
    }),
    CommandModule,
    BooksModule,
    ReviewsModule,
    SeedModule,
  ],
  providers: [SeedCommand],
})
export class AppModule {}
