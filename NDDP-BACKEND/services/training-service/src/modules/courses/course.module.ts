import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingCourse } from '../../database/entities/training-course.entity';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseRepository } from './repositories/course.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingCourse]), EventsModule],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository],
  exports: [CourseRepository],
})
export class CourseModule {}
