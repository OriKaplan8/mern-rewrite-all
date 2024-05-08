import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';


import { JsonBatchesModule } from './jsonBatches/jsonBatches.module';
import { jsonAnnotationsModule } from './jsonAnnotations/jsonAnnotations.module';






@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}),
    
    //todo : read on env and envvar 
    MongooseModule.forRoot(process.env.DB_URI),
     
     AuthModule, UserModule, JsonBatchesModule, jsonAnnotationsModule
  ],


  
  

})

export class AppModule {} 
