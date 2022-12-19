import { DatabaseModules } from './../database/database.module';
import { SendNotificationUseCase } from './../../application/useCases/sendNotificationUseCase';
import { KafkaConsumerService } from './kafka/kafka-consumer.service';
import { Module } from '@nestjs/common';
import { NotificationsController } from './kafka/controllers/notifications.controller';


@Module({
    imports: [DatabaseModules],
    providers: [KafkaConsumerService, SendNotificationUseCase],
    controllers: [NotificationsController]
})

export class MessagingModule {}