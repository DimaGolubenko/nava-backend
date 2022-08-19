import { NotFoundException } from '@nestjs/common';
export class NotFoundSizeException extends NotFoundException {
  constructor(id: number) {
    super(`Not found size with id ${id}`);
  }
}
