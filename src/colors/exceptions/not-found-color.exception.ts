import { NotFoundException } from '@nestjs/common';

export class NotFoundColorException extends NotFoundException {
  constructor(id: number) {
    super(`Not found color with id ${id}`);
  }
}
