import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/nest_db'),
    AuthModule,
    CommonModule
  ]
})
export class AppModule {}
