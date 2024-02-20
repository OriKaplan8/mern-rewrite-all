import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AnnotationService } from './annotation.service';
import { AnnotationDto } from './dto/annotation.dto';
import { jwtGuard } from 'src/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user-decorator';

@Controller('annotations')
export class AnnotationController {
    constructor(private annotationService: AnnotationService) {}

    @UseGuards(jwtGuard)
    @Post('annotate')
    async annotate
    (@Body() annotationDto: AnnotationDto, @GetUser() user,
    ) {
        return this.annotationService.annotate(annotationDto, user)
    }
} 
