import { GetRecipientNotificationsUseCase } from '@application/useCases/getRecipientNotifications';
import { UnReadNotificationUseCase } from '@application/useCases/unreadNotificationUseCase';
import { ReadNotificationUseCase } from '@application/useCases/readNotification';
import { CancelNotificationUseCase } from '@application/useCases/cancelNotificationUseCase';
import { NotificationViewModel } from './../view-models/notification-view-model';
import { SendNotificationUseCase } from '@application/useCases/sendNotificationUseCase';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CountRecipientNotificationsUseCase } from '@application/useCases/countRecipientNotificationsUseCase';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotificationUseCase: SendNotificationUseCase,
    private cancelNotificationUseCase: CancelNotificationUseCase,
    private readNotificationUseCase: ReadNotificationUseCase,
    private unreadNotificationUseCase: UnReadNotificationUseCase,
    private countRecipientNotificationsUseCase: CountRecipientNotificationsUseCase,
    private getRecipientNotificationsUseCase: GetRecipientNotificationsUseCase
  ) { }


  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotificationUseCase.execute({
      notificationId: id,
    })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotificationsUseCase.execute({
      recipientId
    })

    return { count };
  }


  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotificationsUseCase.execute({
      recipientId
    })

    return { notifications: notifications.map(NotificationViewModel.toHttp) };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotificationUseCase.execute({
      notificationId: id,
    })
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotificationUseCase.execute({
      notificationId: id,
    })
  }

  @Post()
  async postCreate(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      content,
      category
    })

    return {
      notification: NotificationViewModel.toHttp(notification)
    };
  }

}
