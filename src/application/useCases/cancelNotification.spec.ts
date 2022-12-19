import { makeNotification } from '@test/factories/notification-factory';
import { NotificationNotFound } from './errors/notification-not-found';
import { Notification } from '@application/entities/notification';
import { Content } from './../entities/content';
import { CancelNotificationUseCase } from './cancelNotificationUseCase';
import { InMemoryNotificationsRepository } from './../../../test/repositories/in-memory-notification-repository';

describe('Cancel notification', () => {
    it('should be able to send a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotificationUseCase = new CancelNotificationUseCase(notificationsRepository)

        const notification = new Notification(makeNotification())

        await notificationsRepository.create(notification);

        await cancelNotificationUseCase.execute({
            notificationId: notification.id
        })

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(
            expect.any(Date)
        )
    })

    it('should not be able to cancel a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotificationUseCase = new CancelNotificationUseCase(notificationsRepository)

        expect(() => {
            return cancelNotificationUseCase.execute({
                notificationId: 'fake-notification-id',
            })
        }).rejects.toThrow(NotificationNotFound);
    });
})

 