import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories/notification-repositories';

interface ICountRecipientNotificationsRequest {
    recipientId: string
}

interface CountRecipientNotificationsResponse {
    count: number;
}

@Injectable()
export class CountRecipientNotificationsUseCase {

    constructor(
        private readonly notificationRepository: NotificationsRepository
    ) { }

    async execute(request: ICountRecipientNotificationsRequest): Promise<CountRecipientNotificationsResponse> {
        const { recipientId } = request;

        const count = await this.notificationRepository.countManyByRecipientId(recipientId);

        return { count };
    }
}