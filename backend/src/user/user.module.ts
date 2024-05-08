import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}]) ,
  AuthModule, ],
  providers: [UserService],
  controllers: [UserController],
  
})
export class UserModule {}
