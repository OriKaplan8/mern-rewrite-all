import { Module } from '@nestjs/common';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { TurnModule } from 'src/turn/turn.module';
import { AnnotationService } from 'src/annotation/annotation.service';
import { AnnotationModule } from 'src/annotation/annotation.module';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}]), AuthModule, TurnModule, AnnotationModule],
  controllers: [ProgressController],
  providers: [ProgressService]
})
export class ProgressModule {}
