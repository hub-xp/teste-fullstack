import { IsNotEmpty } from 'class-validator';

export class CreateBookDTO {
  @IsNotEmpty({ message: 'Name is required' } as any)
  name: string;
}
