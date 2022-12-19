import { HttpModule } from './infra/http/http.module';
import { Module } from '@nestjs/common';
import { DatabaseModules } from './infra/database/database.module';
import { MessagingModule } from '@infra/messaging/messaging.module';

@Module({
  imports: [HttpModule, DatabaseModules, MessagingModule],
})
export class AppModule {}
