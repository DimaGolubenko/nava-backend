// Core
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';

// Services
import { FilesService } from './files.service';

// Controllers
import { FilesController } from './files.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads',
    }),
  ],
  providers: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
