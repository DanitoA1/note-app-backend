import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ example: 'My First Note' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'This is a description of my note.' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: 'bg-yellow-400' })
  @IsString()
  @IsNotEmpty()
  @IsIn([
    'bg-yellow-400',
    'bg-orange-400',
    'bg-purple-400',
    'bg-blue-400',
    'bg-green-400',
  ])
  color: string;
}
