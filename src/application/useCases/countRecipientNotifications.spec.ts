import { CountRecipientNotificationsUseCase } from './countRecipientNotificationsUseCase';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notification-repository';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count recipients notifications', () => {
    it('should be able to count recipient notifications', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const countRecipientNotificationUseCase = new CountRecipientNotificationsUseCase(notificationsRepository)

        await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }));
        await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }));
        await notificationsRepository.create(makeNotification({ recipientId: 'recipient-2' }));

        const { count } = await countRecipientNotificationUseCase.execute({
            recipientId: 'recipient-1'
        })

        expect(count).toEqual(2);
    })
})

