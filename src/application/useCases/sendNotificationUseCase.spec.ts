import { NotificationsRepository } from '@application/repositories/notification-repositories';
import { InMemoryNotificationsRepository } from './../../../test/repositories/in-memory-notification-repository';
import { SendNotificationUseCase } from './sendNotificationUseCase';

describe('Send notification', () => {
    it('should be able to send a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();

        const sendNotificationUseCase = new SendNotificationUseCase(notificationsRepository)

        const { notification } = await sendNotificationUseCase.execute({
            content: 'this is a notification',
            category: 'social',
            recipientId: 'example-recipient-id'
        })

        expect(notificationsRepository.notifications).toHaveLength(1);
        expect(notificationsRepository.notifications[0]).toEqual(notification);
    })
})