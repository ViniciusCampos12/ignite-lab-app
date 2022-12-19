import { UnReadNotificationUseCase } from './../../application/useCases/unreadNotificationUseCase';
import { ReadNotificationUseCase } from './../../application/useCases/readNotification';
import { CancelNotificationUseCase } from './../../application/useCases/cancelNotificationUseCase';
import { CountRecipientNotificationsUseCase } from '@application/useCases/countRecipientNotificationsUseCase';
import { GetRecipientNotificationsUseCase } from './../../application/useCases/getRecipientNotifications';
import { DatabaseModules } from './../database/database.module';
import { SendNotificationUseCase } from './../../application/useCases/sendNotificationUseCase';
import { NotificationsController } from './controllers/notifications.controller';
import { Module } from "@nestjs/common";

@Module({
    imports: [DatabaseModules],
    controllers: [NotificationsController],
    providers: [
        SendNotificationUseCase,
        GetRecipientNotificationsUseCase,
        CountRecipientNotificationsUseCase,
        CancelNotificationUseCase,
        ReadNotificationUseCase,
        UnReadNotificationUseCase
    ]
})

export class HttpModule {}