import { SendNotificationUseCase } from './../../../../application/useCases/sendNotificationUseCase';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

interface ISendNotificationPayload {
    content: string;
    category: string;
    recipientId: string;
}

@Controller()
export class NotificationsController {

    constructor(private sendNotificationUseCase: SendNotificationUseCase) { }

    @EventPattern('notifications.send-notification')
    async handleSendNotification(@Payload() { content, category, recipientId }: ISendNotificationPayload) {
        await this.sendNotificationUseCase.execute({
            category,
            content,
            recipientId
        });
    }
}