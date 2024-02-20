import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TurnSchema } from './turn.schema';
import { TurnService } from './turn.service';
import { TurnController } from './turn.controller';
import { AuthModule } from 'src/auth/auth.module';
import { BatchController } from './batch.controller'; 



@Module({
    imports: [  MongooseModule.forFeature([{name: 'Turn', schema: TurnSchema}]) ,
    AuthModule],
    providers: [TurnService],
    controllers: [TurnController, BatchController],
    exports: [TurnService]
})

export class TurnModule {}
