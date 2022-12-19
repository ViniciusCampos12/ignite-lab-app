import { NotificationNotFound } from './errors/notification-not-found';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories/notification-repositories';

interface IReadNotificationRequest {
    notificationId: string
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotificationUseCase {

    constructor(
        private readonly notificationRepository: NotificationsRepository
    ){}

    async execute(request: IReadNotificationRequest): Promise<ReadNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationRepository.findById(notificationId);
    
        if (!notification){
            throw new NotificationNotFound();
        }

        notification.read();

        await this.notificationRepository.save(notification);
    }
}