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


@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}),

    //todo : read on env and envvar
    MongooseModule.forRoot('mongodb+srv://orik:Ori121322@cluster0.tyiy3mk.mongodb.net/rewrite?retryWrites=true&w=majority'),
    TurnModule, 
    AuthModule, AnnotationModule, UserModule,
  ],
  
  

})
export class AppModule {} 
