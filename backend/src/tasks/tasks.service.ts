import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, userId: number) {
    const task = await this.prisma.task.findFirst({
      where: { id, userId },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async create(dto: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        completed: false,
        userId,
      },
    });
  }

  async update(id: number, dto: UpdateTaskDto, userId: number) {
    const task = await this.findOne(id, userId);

    return this.prisma.task.update({
      where: { id: task.id },
      data: {
        title: dto.title ?? task.title,
        completed: dto.completed ?? task.completed,
      },
    });
  }

  async delete(id: number, userId: number) {
    const task = await this.findOne(id, userId);
    await this.prisma.task.delete({ where: { id: task.id } });
  }
}
