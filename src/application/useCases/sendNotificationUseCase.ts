import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories/notification-repositories';
import { Notification } from '../entities/notification';
import { Content } from './../entities/content';

interface ISendNotificationRequest {
    recipientId: string;
    content: string;
    category: string;
}

interface ISendNotificationResponse {
    notification: Notification;
}

@Injectable()
export class SendNotificationUseCase {

    constructor(
        private readonly notificationRepository: NotificationsRepository
    ){}

    async execute(request: ISendNotificationRequest): Promise<ISendNotificationResponse> {
        const { recipientId, content, category } = request;

        const notification = new Notification({
            recipientId,
            content: new Content(content),
            category
        });

        await this.notificationRepository.create(notification);

        return {
            notification,
        };
    }
}