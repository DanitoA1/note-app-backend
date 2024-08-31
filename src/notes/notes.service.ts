// src/notes/notes.service.ts
import { Injectable } from '@nestjs/common';
import { Note, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.NoteCreateInput): Promise<Note> {
    const { title, text, color } = data;
    return this.prisma.note.create({ data: { title, text, color } });
  }

  async search(query: string): Promise<Note[]> {
    return this.prisma.note.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
          {
            text: {
              contains: query,
            },
          },
        ],
      },
    });
  }

  async findAll(): Promise<Note[]> {
    return this.prisma.note.findMany();
  }

  async findOne(id: string): Promise<Note | null> {
    return this.prisma.note.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.NoteUpdateInput): Promise<Note> {
    return this.prisma.note.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Note> {
    return this.prisma.note.delete({ where: { id } });
  }
}
