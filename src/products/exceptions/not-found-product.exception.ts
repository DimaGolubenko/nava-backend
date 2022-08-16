import { NotFoundException } from '@nestjs/common';

export class NotFoundProductException extends NotFoundException {
  constructor(id: number) {
    super(`Not found product with id ${id}`);
  }
}
