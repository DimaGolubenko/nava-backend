import { NotFoundException } from '@nestjs/common';

export class NotFoundCategoryException extends NotFoundException {
  constructor(id: number) {
    super(`Not found category with id ${id}`);
  }
}
