import { ReadNotificationUseCase } from './readNotification';
import { makeNotification } from '@test/factories/notification-factory';
import { NotificationNotFound } from './errors/notification-not-found';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from './../../../test/repositories/in-memory-notification-repository';

describe('Read notification', () => {
    it('should be able to Read a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const readNotificationUseCase = new ReadNotificationUseCase(notificationsRepository)

        const notification = new Notification(makeNotification())

        await notificationsRepository.create(notification);

        await readNotificationUseCase.execute({
            notificationId: notification.id
        })

        expect(notificationsRepository.notifications[0].readAt).toEqual(
            expect.any(Date)
        )
    })

    it('should not be able to Read a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const readNotificationUseCase = new ReadNotificationUseCase(notificationsRepository)

        expect(() => {
            return readNotificationUseCase.execute({
                notificationId: 'fake-notification-id',
            })
        }).rejects.toThrow(NotificationNotFound);
    });
})

 