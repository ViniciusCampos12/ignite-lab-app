import { NotificationNotFound } from './errors/notification-not-found';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories/notification-repositories';

interface ICancelNotificationRequest {
    notificationId: string
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotificationUseCase {

    constructor(
        private readonly notificationRepository: NotificationsRepository
    ){}

    async execute(request: ICancelNotificationRequest): Promise<CancelNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationRepository.findById(notificationId);
    
        if (!notification){
            throw new NotificationNotFound();
        }

        notification.cancel();

        await this.notificationRepository.save(notification);
    }
}