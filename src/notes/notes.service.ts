// src/notes/notes.service.ts
import { Injectable } from '@nestjs/common';
import { Note, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchNotesDto } from './dto/search-note.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateNoteDto): Promise<Note> {
    const { title, text, color } = data;
    return this.prisma.note.create({ data: { title, text, color } });
  }

  async search(query: SearchNotesDto): Promise<Note[]> {
    return this.prisma.note.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query.q,
            },
          },
          {
            text: {
              contains: query.q,
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

  async update(id: string, data: UpdateNoteDto): Promise<Note> {
    return this.prisma.note.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Note> {
    return this.prisma.note.delete({ where: { id } });
  }
}
