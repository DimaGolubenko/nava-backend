import { NotFoundException } from '@nestjs/common';

export class NotFoundUserException extends NotFoundException {
  constructor(id: number) {
    super(`Not found user with id ${id}`);
  }
}
