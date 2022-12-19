import { HttpModule } from './infra/http/http.module';
import { Module } from '@nestjs/common';
import { DatabaseModules } from './infra/database/database.module';

@Module({
  imports: [HttpModule, DatabaseModules],
})
export class AppModule {}
