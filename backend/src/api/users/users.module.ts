import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models';
import { UsersRepository } from './repositories';
import { USERS_SERVICE, UserService } from './services';
import { MailerModule } from '@/common/mailer';
import { DatabaseModule } from '@/common/database';
import {
	CheckOtpExistedMiddleware,
	CheckUserExistedMiddleware,
} from './middlewares';
import { addUsersRoute } from '.';
import { UsersController } from './controllers';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
		MailerModule,
		DatabaseModule,
	],
	controllers: [UsersController],
	providers: [
		UsersRepository,
		{
			provide: USERS_SERVICE,
			useClass: UserService,
		},
	],
	exports: [
		{
			provide: USERS_SERVICE,
			useClass: UserService,
		},
	],
})
export class UsersModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(CheckUserExistedMiddleware)
			.forRoutes(addUsersRoute('otp/:email'));
		consumer
			.apply(CheckOtpExistedMiddleware, CheckUserExistedMiddleware)
			.forRoutes(addUsersRoute('active/:otp'));
	}
}
