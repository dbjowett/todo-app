import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserPayload } from 'src/auth/types';
import { User } from 'src/common/utils/user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAll(@User() user: UserPayload) {
    if (!user || !user.sub) {
      throw new Error('User information is missing in the request.');
    }
    return this.tasksService.findAll(user.sub);
  }

  @Post()
  create(@Body() dto: CreateTaskDto, @User() user: UserPayload) {
    return this.tasksService.create(dto, user.sub);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
    @User() user: UserPayload,
  ) {
    return this.tasksService.update(id, dto, user.sub);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.tasksService.delete(id, req.user.id);
  }
}
