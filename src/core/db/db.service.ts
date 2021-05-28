import { Injectable } from '@nestjs/common';
import { MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class DbService implements MongooseOptionsFactory {
  createMongooseOptions() {
    return {
      uri: `mongodb://${process.env.DB_HOST}:27017`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: process.env.DB_AUTH_NAME,
      pass: process.env.DB_AUTH_PASSWORD,
      dbName: process.env.DB_NAME,
    };
  }
}
