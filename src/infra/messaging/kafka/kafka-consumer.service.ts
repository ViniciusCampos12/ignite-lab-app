import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy {
    constructor() {
        super({
            client: {
                clientId: 'notifications',
                brokers: ['host-kafka'],
                sasl: {
                    mechanism: 'scram-sha-256',
                    username: 'your-username',
                    password: 'your-password',
                },
                ssl: true,
            }
        })
    }


    async onModuleDestroy() {
        await this.close();
    }
}