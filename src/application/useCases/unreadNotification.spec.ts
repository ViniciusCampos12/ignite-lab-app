import { UnReadNotificationUseCase } from './unreadNotificationUseCase';
import { makeNotification } from '@test/factories/notification-factory';
import { NotificationNotFound } from './errors/notification-not-found';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from './../../../test/repositories/in-memory-notification-repository';

describe('Unread notification', () => {
    it('should be able to Unread a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unReadNotificationUseCase = new UnReadNotificationUseCase(notificationsRepository)

        const notification = new Notification(makeNotification({
            readAt: new Date()
        }))

        await notificationsRepository.create(notification);

        await unReadNotificationUseCase.execute({
            notificationId: notification.id
        })

        expect(notificationsRepository.notifications[0].readAt).toBeNull()
    })

    it('should not be able to Unread a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unReadNotificationUseCase = new UnReadNotificationUseCase(notificationsRepository)

        expect(() => {
            return unReadNotificationUseCase.execute({
                notificationId: 'fake-notification-id',
            })
        }).rejects.toThrow(NotificationNotFound);
    });
})

 