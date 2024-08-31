// src/notes/notes.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from '@prisma/client';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(
    @Body() noteData: { title: string; text: string; color: string },
  ): Promise<Note> {
    return this.notesService.create(noteData);
  }

  @Get()
  findAll(): Promise<Note[]> {
    return this.notesService.findAll();
  }

  @Get('search')
  async search(@Query('q') query: string): Promise<Note[]> {
    return this.notesService.search(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Note | null> {
    return this.notesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() noteData: { title: string; text: string; color: string },
  ): Promise<Note> {
    return this.notesService.update(id, noteData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Note> {
    return this.notesService.remove(id);
  }
}
