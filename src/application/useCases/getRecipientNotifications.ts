import { Notification } from '@application/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories/notification-repositories';

interface IGetRecipientNotificationsRequest {
    recipientId: string
}

interface GetRecipientNotificationsResponse {
    notifications: Notification[];
}

@Injectable()
export class GetRecipientNotificationsUseCase {

    constructor(
        private readonly notificationRepository: NotificationsRepository
    ) { }

    async execute(request: IGetRecipientNotificationsRequest): Promise<GetRecipientNotificationsResponse> {
        const { recipientId } = request;

        const notifications = await this.notificationRepository.findManyByRecipientId(recipientId);

        return { notifications };
    }
}