import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { TurnModule } from 'src/turn/turn.module';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}]) ,
  AuthModule, TurnModule],
  providers: [UserService],
  controllers: [UserController],
  
})
export class UserModule {}
