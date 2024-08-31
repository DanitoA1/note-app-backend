// src/notes/dto/search-notes.dto.ts

import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchNotesDto {
  @ApiPropertyOptional({
    description: 'Search query string to filter notes by title or text.',
    example: 'meeting notes',
  })
  @IsOptional()
  @IsString()
  q?: string;
}
