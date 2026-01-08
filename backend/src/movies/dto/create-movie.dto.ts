import { IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsInt()
  @Min(1900)
  @Max(2100)
  releaseYear: number;
}

export class UpdateMovieDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsString()
  director?: string;

  @IsInt()
  @Min(1900)
  @Max(2100)
  releaseYear?: number;
}
