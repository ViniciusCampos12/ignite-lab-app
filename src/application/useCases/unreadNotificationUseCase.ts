import { NotificationNotFound } from './errors/notification-not-found';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories/notification-repositories';

interface IUnReadNotificationRequest {
    notificationId: string
}

type UnReadNotificationResponse = void;

@Injectable()
export class UnReadNotificationUseCase {

    constructor(
        private readonly notificationRepository: NotificationsRepository
    ){}

    async execute(request: IUnReadNotificationRequest): Promise<UnReadNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationRepository.findById(notificationId);
    
        if (!notification){
            throw new NotificationNotFound();
        }

        notification.unRead();

        await this.notificationRepository.save(notification);
    }
}