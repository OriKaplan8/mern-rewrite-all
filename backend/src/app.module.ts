import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TurnModule } from './turn/turn.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AnnotationController } from './annotation/annotation.controller';
import { AnnotationService } from './annotation/annotation.service';
import { AnnotationModule } from './annotation/annotation.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ProgressModule } from './progress/progress.module';
import { JsonController } from './json/json.controller';
import { JsonService } from './json/json.service';
import { JsonModule } from './json/json.module';



@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}),
    
    //todo : read on env and envvar
    MongooseModule.forRoot(process.env.DB_URI),

    TurnModule, 
    AuthModule, AnnotationModule, UserModule, ProgressModule, JsonModule,
  ],
  controllers: [JsonController],
  providers: [JsonService],
  
  

})

export class AppModule {} 
